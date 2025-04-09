import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "../../../../../utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "../../../../../utils/auth";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await connectDb();
        if (!email || !password) {
          throw new Error("invalid data!");
        }
        // console.log(email);

        const user = await User.findOne({ email: email });
        // console.log(user);
        if (user == null) {
          throw new Error("User does'nt exist!");
        }
        const isValidPassword = await verifyPassword(password, user.password);
        // console.log({ isValidPassword });
        if (!isValidPassword) {
          throw new Error("Email or password is incorrect");
        }
        const name = user?.name?.split(" ");
        const isModerator = user.isModerator;
        // console.log("resid be 2");
        // console.log(user);
        return {
          name: name[0],
          email,
          image: isModerator,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
