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
        email: { label: 'Email', tyle: 'text', placeholder: 'ID를 입력하세요' },
        password: { label: 'Password', tyle: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await MySQLAdapter.getUserByEmailWithPassword(credentials.email);

        if (user && (await bcrypt.compare(credentials.password, user.hashed_password!))) {
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
  pages: {
    signIn: '/auth/login',
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
