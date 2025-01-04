import { RowDataPacket } from 'mysql2';

export interface UserRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  image: string | null;
  user_type: string;
  hashed_password?: string;
}

export interface SessionRow extends RowDataPacket {
  session_token: string;
  user_id: string;
  expires: string;
}
