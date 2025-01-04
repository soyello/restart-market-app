import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
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
        email: { label: 'Email', type: 'text', placeholder: 'ID를 입력하세요' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await MySQLAdapter.getUserByEmailWithPassword(credentials.email);

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashed_password!);

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        if (user && isCorrectPassword) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.user_type,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
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
