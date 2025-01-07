import { ProductRow, ProductWithUserRow, SessionRow, UserConversationRow, UserRow } from './row';
import { AdapterSession, AdapterUser } from 'next-auth/adapters';
import { Product } from './type';

export const mapToAdapterUser = (row: UserRow): AdapterUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  image: row.image ?? null,
  emailVerified: row.emailVerified ?? null,
  role: row.user_type,
  favoriteIds: row.favorite_ids,
});

export const mapToAdapterSession = (row: SessionRow): AdapterSession => ({
  sessionToken: row.session_token,
  userId: row.user_id,
  expires: new Date(row.expires),
});

export const mapToProduct = (row: ProductRow): Product => {
  console.log('Row data:', row);
  return {
    id: row.id.toString(),
    title: row.title,
    description: row.description,
    imageSrc: row.image_src,
    category: row.category,
    latitude: row.latitude,
    longitude: row.longitude,
    price: row.price,
    userId: row.user_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
};

export const mapToProducts = (rows: ProductRow[]): Product[] => {
  return rows.map(mapToProduct);
};

export const mapToProductWithUser = (row: ProductWithUserRow) => {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageSrc: row.image_src,
    category: row.category,
    latitude: row.latitude,
    longitude: row.longitude,
    price: row.price,
    userId: row.user_id,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    user: {
      id: row.userId,
      name: row.userName ?? null,
      email: row.userEmail,
      image: row.userImage ?? null,
      role: row.userType,
    },
  };
};

export const mapRowToUserConversation = (row: UserConversationRow) => {
  return {
    id: row.userId,
    name: row.userName,
    email: row.userEmail,
    image: row.userImage,
    conversationId: row.conversationId,
    conversationName: row.conversationName,
    conversationCreatedAt: row.conversationCreatedAt,
    messageId: row.messaegId,
    messageText: row.messageText,
    messageImage: row.messageImage,
    messageCreatedAt: row.messageCreatedAt,
    messageUpdatedAt: row.messageUpdatedAt,
    sender: row.senderId
      ? {
          id: row.senderId,
          name: row.senderName,
          email: row.senderEmail,
          image: row.senderImage,
        }
      : null,
    receiver: row.receiverId
      ? {
          id: row.receiverId,
          name: row.receiverName,
          email: row.recieverEmail,
          image: row.receiverImage,
        }
      : null,
  };
};
