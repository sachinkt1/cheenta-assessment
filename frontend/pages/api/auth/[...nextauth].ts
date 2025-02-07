import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/auth/google-login`,
          {
            googleId: user.id,
            name: user.name,
            email: user.email,
            avatar: user.image,
          }
        );

        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error saving user to backend:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/auth/me`,
          { params: { email: session?.user?.email } }
        );

        if (response.status === 200) {
          session.user.id = response.data.id;
          session.user.role = response.data.role;
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }

      return session;
    },
  },
});
