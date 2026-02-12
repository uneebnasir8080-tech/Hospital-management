import { api } from "@/lib/apiCall";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      Credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await api.post("/login", credentials);
          console.log("data",data)
          if (data && data.token) {
            const { user, token } = data;
            return {  
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              token: token,
              message: data.message
            };
          }
          throw new Error("Invalid email or password");
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.data?.message) {
            throw new Error(error.response.data.message);
          } else if (error instanceof Error) {
            throw error;
          } else {
            throw new Error("Something went wrong");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
        token.message= user.message
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.name = token.name;
      session.email = token.email;
      session.role = token.role;
      session.token = token.token;
      session.message=token.message
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
