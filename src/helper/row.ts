import { RowDataPacket } from 'mysql2';

export interface UserRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  image: string | null;
  user_type: string;
  hashed_password?: string;
  favorite_ids: string[];
}

export interface SessionRow extends RowDataPacket {
  session_token: string;
  user_id: string;
  expires: string;
}

export interface ProductRow extends RowDataPacket {
  id: string;
  title: string;
  description: string;
  image_src: string;
  category: string;
  latitude: number;
  longitude: number;
  price: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductUserRow extends RowDataPacket {
  userId: string;
  userName: string | null;
  useremail: string;
  userImage: string | null;
  usertype: string;
}

export type ProductWithUserRow = ProductRow & ProductUserRow;

export interface UserConversationRow extends RowDataPacket {
  userId: string;
  userName: string;
  userEmail: string;
  userImage: string;
  conversations: Conversation[] | null;
}

export interface Message {
  messageId: string;
  text: string | null;
  image: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  sender: {
    id: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  receiver: {
    id: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}
export interface Conversation {
  conversationId: number;
  conversationName: string | null;
  conversationCreatedAt: string;
  messages: Message[];
  users: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  }[];
}
