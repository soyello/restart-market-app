import { ProductRow, SessionRow, UserRow } from './row';
import { AdapterSession, AdapterUser } from 'next-auth/adapters';
import { Product } from './type';

export const mapToAdapterUser = (row: UserRow): AdapterUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  image: row.image ?? null,
  emailVerified: row.emailVerified ?? null,
  role: row.user_type,
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
