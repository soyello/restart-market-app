import { AdapterUser } from 'next-auth/adapters';

export interface Product {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  latitude: number;
  longitude: number;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type Serialized<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

export type SerializedProduct = Serialized<Product>;

export type TUserWithChat = AdapterUser & {
  conversations: TConversation[];
};

export type TConversation = {
  id: string;
  messages: Message[];
  users: AdapterUser[];
};
export type Message = {
  id: string;
  text?: string;
  image?: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  createdAt: Date;
  updatedAt?: Date;
};
