import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "../../../../../utils/connectDB";
import {
  generateHashPassword,
  verifyPassword,
} from "../../../../../utils/auth";

export async function POST(req, res) {
  try {
    await connectDb();

    const data = await req.json();
    const { currentPassword, newPassword } = data;

    // console.log(currentPassword, newPassword);

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Please fill in all fields.",
        },
        { status: 401 }
      );
    }

    const session = await getServerSession({ req });
    // console.log({ session });

    if (session == null) {
      return NextResponse.json(
        {
          status: "failed",
          message: "invalid token",
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session?.user?.email });
    // console.log(user);

    const checkPassword = await verifyPassword(currentPassword, user?.password);
    // console.log(checkPassword);
    if (!checkPassword) {
      return NextResponse.json(
        {
          status: "failed",
          message: "password is incorrect!",
        },
        { status: 401 }
      );
    }

    const newHashPassword = await generateHashPassword(newPassword);

    user.password = newHashPassword;
    await user.save();
    return NextResponse.json(
      { status: "success", message: "password is changed!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "failed",
        message: `Error : ${err}`,
      },
      { status: 500 }
    );
  }
}
