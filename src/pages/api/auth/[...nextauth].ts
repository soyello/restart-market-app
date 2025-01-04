import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { RowDataPacket } from 'mysql2';
import pool from '../../../lib/db';
import NextAuth from 'next-auth/next';
import MySQLAdapter from '@/lib/mysqlAdapter';

interface UserRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  hashdedPassword?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: MySQLAdapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', tyle: 'text', placeholder: 'ID를 입력하세요' },
        password: { label: 'Password', tyle: 'password' },
      },
      async authorize(credentials) {
        const hardcodedUser = {
          id: '정재연 천재',
          name: '부자 정재연',
          email: 'hello@love.com',
          hashedPassword: '12345',
          role: 'User',
        };
        if (!credentials) return null;
        if (credentials.email === hardcodedUser.email && credentials.password === hardcodedUser.hashedPassword) {
          return hardcodedUser as User;
        }

        const [rows] = await pool.query<UserRow[]>(
          'SELECT id, name, email, user_type, hashed_password FROM users WHERE email=?',
          [credentials.email]
        );

        const user = rows[0];

        if (user && user.hashded_password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.user_type,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('token', token);
      console.log('user', user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('@', session, token);
      if (token) {
        session.user = {
          ...(session.user || {}),
          id: token.id as string,
          role: token.id as string,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
