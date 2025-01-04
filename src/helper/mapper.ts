import { CustomAdapterUser } from '@/lib/mysqlAdapter';
import { UserRow } from './row';

export const mapToAdapterUser = (row: UserRow): CustomAdapterUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  image: row.image ?? null,
});
