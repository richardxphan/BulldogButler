import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import User from './src/models/UserSchema';
import { connectToDB } from './config/db';

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

        await connectToDB();

        const user = await User.findOne({ email });
        if (!user) return null;

        const valid = await compare(password, user.password);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
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
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  
    async session({ session, token }: { session: any; token: any }) {
      if (session.user && token?.id) {
        (session.user as { id: string }).id = token.id;
        (session.user as { name: string }).name = token.name;
        (session.user as { email: string }).email = token.email;
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