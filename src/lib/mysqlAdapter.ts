import { AdapterSession, AdapterUser } from 'next-auth/adapters';
import pool from './db';
import { SessionRow, UserRow } from '@/helper/row';
import { mapToAdapterSession, mapToAdapterUser } from '@/helper/mapper';
import { ResultSetHeader } from 'mysql2';

export type CustomAdapterUser = Omit<AdapterUser, 'emailVerified'>;

const MySQLAdapter = {
  async getUserById(id: string): Promise<CustomAdapterUser | null> {
    if (!id) {
      throw new Error('ID must be provided');
    }
    try {
      const [rows] = await pool.query<UserRow[]>('SELECT id, name, email, image FROM users WHERE id = ?', [id]);
      return rows?.[0] ? mapToAdapterUser(rows[0]) : null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Failed to fetch user');
    }
  },
  async getUserByEmail(email: string): Promise<CustomAdapterUser | null> {
    if (!email) {
      throw new Error('Email must be provided');
    }
    try {
      const [rows] = await pool.query<UserRow[]>('SELECT id, name, email, image FROM users WHERE email=?', [email]);
      if (!rows[0]) return null;
      return mapToAdapterUser(rows[0]);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user by email');
    }
  },
  async createUser(user: Omit<CustomAdapterUser, 'id'>): Promise<CustomAdapterUser> {
    const { name, email, image } = user;
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO users (name, email, image) VALUES (?,?,?)', [
      name,
      email,
      image,
    ]);
    return { id: result.insertId.toString(), name, email, image };
  },
  async updateUser(user: Partial<CustomAdapterUser> & { id: string }): Promise<CustomAdapterUser> {
    const { id, name, email, image } = user;
    if (!id) {
      throw new Error('User ID is required for updating.');
    }
    try {
      const updates = { name, email, image };
      const keys = Object.keys(updates).filter((key) => updates[key as keyof typeof updates] !== undefined);

      if (keys.length === 0) {
        throw new Error('No fields to update. Provide at least one field');
      }
      const fields = keys.map((key) => `${key}=?`).join(',');
      const values = keys.map((key) => updates[key as keyof typeof updates]);

      await pool.query(`UPDATE users SET ${fields} WHERE id=?`, [...values, id]);

      const [rows] = await pool.query<UserRow[]>('SELECT id, name, email, image FROM users WHERE id=?', [id]);

      if (!rows[0]) {
        throw new Error(`User with ID: ${id} not found after update.`);
      }
      return mapToAdapterUser(rows[0]);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user.');
    }
  },
  async deleteUser(id: string): Promise<void> {
    await pool.query('DELETE FROM users WHERE id=?', [id]);
  },
  async getSessionAndUser(sessionToken: string): Promise<{
    session: AdapterSession;
    user: CustomAdapterUser;
  } | null> {
    try {
      const [results] = await pool.query<(SessionRow & UserRow)[]>(
        `SELECT
            s.session_token AS session_token,
            s.user_id AS user_id,
            s.expires AS expires,
            u.id AS id,
            u.name AS name,
            u.email AS email,
            u.image AS image
          FROM sessions AS s
          LEFT JOIN users AS u ON s.user_id = u.id
          WHERE s.session_token=?`,
        [sessionToken]
      );
      const result = results[0];
      if (!result) return null;
      const session = mapToAdapterSession(result);
      const user = mapToAdapterUser(result);

      return { session, user };
    } catch (error) {
      console.error('Error fetching sessio and user:', error);
      throw new Error('Failed to fetching session and user');
    }
  },
  async createSession(session: AdapterSession): Promise<AdapterSession> {
    const { sessionToken, userId, expires } = session;
    if (!sessionToken || !userId || !expires) {
      throw new Error('All fields (sessionToken, userId, expires) are required to create a session');
    }
    try {
      await pool.query('INSERT INTO sessions (session_token, user_id, expires) VALUES (?,?,?)', [
        sessionToken,
        userId,
        expires,
      ]);
      const [rows] = await pool.query<SessionRow[]>(
        'SELECT session_token, user_id, expires FROM sessions WHERE session_token = ?',
        [sessionToken]
      );

      const result = rows[0];
      if (!result) {
        throw new Error('Failed to retrieve the created session from the database.');
      }
      return mapToAdapterSession(result);
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error('Failed to create session.');
    }
  },
  async updateSession(session: Partial<AdapterSession> & { sessionToken: string }): Promise<AdapterSession | null> {
    const { sessionToken, userId, expires } = session;
    if (!sessionToken) {
      throw new Error('Session token is required to update a session');
    }
    try {
      const updates = { user_id: userId, expires };
      const keys = Object.keys(updates).filter((key) => updates[key as keyof typeof updates] !== undefined);

      if (keys.length === 0) {
        throw new Error('No fields to update. Provide at least one fields');
      }

      const fields = keys.map((key) => `${key}=?`).join(', ');
      const values = keys.map((key) => updates[key as keyof typeof updates]);

      const query = `UPDATE sessions SET ${fields} WHERE session_token = ?`;
      await pool.query(query, [...values, sessionToken]);

      const [rows] = await pool.query<SessionRow[]>(
        'SELECT session_token, user_id, expires FROM sessions WHERE session_token = ?',
        [sessionToken]
      );
      if (!rows.length) {
        return null;
      }
      return mapToAdapterSession(rows[0]);
    } catch (error) {
      console.error(`Error updating session for token "${sessionToken}":`, error);
      throw new Error('Failed to update session.');
    }
  },
  async deleteSession(sessionToken: string): Promise<void> {
    if (!sessionToken) {
      throw new Error('Sesseion token is required to delete a session.');
    }
    try {
      await pool.query('DELETE FROM sessions WHERE session_token = ?', [sessionToken]);
    } catch (error) {
      console.error('Error deleting session:', error);
      throw new Error('Failed to delete session.');
    }
  },
};

export default MySQLAdapter;
