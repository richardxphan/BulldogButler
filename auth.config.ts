import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import User from './src/models/UserSchema';
import dbConnect from './src/lib/dbConnect';

export const authConfig = {
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

        if (!email || !password || !email.endsWith('@uga.edu')) {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) return null;

        const valid = await compare(password, user.password);
        if (!valid) return null;

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
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  
    async session({ session, token }: { session: any; token: any }) {
      if (session.user && token?.id) {
        (session.user as { id: string }).id = token.id;
      }
      return session;
    },
  
    async signIn() {
      return true;
    },
  }
  ,

  secret: process.env.NEXTAUTH_SECRET,
};
