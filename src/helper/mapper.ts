import { CustomAdapterUser } from '@/lib/mysqlAdapter';
import { SessionRow, UserRow } from './row';
import { AdapterSession } from 'next-auth/adapters';

export const mapToAdapterUser = (row: UserRow): CustomAdapterUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  image: row.image ?? null,
});

export const mapToAdapterSession = (row: SessionRow): AdapterSession => ({
  sessionToken: row.session_token,
  userId: row.user_id,
  expires: new Date(row.expires),
});
