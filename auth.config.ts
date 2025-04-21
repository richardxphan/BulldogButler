import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import User from './src/models/UserSchema'; // Rename if your model file is different
import dbConnect from './src/lib/dbConnect';

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // 🔒 Validate inputs
        if (!email || !password || !email.endsWith('@uga.edu')) {
          return null;
        }

        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // 🛠 Type-safe workaround to extend session
      if (session.user && token?.id && typeof token.id === 'string') {
        (session.user as { id: string }).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
