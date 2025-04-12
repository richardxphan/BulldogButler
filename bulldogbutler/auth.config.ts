import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from "./src/models/UserSchema";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
      
        if (!email || !password) return null;
      
        const user = await User.findOne({ email });
        if (!user) return null;
      
        const isValid = await compare(password, user.password);
        if (!isValid) return null;
      
        return { id: user._id.toString(), email: user.email };
      }
           
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  }
};
