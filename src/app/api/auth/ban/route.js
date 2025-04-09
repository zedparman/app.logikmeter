import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import User from "@/models/User";

export async function POST(req, res) {
  await connectDb();

  const data = await req.json();
  const { email } = data;

  if (!email) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed",
      },
      { status: 401 }
    );
  }

  const session = await getServerSession({ req });
  // console.log({ session });

  if (session == null || session.user.image == false) {
    return NextResponse.json(
      {
        status: "failed",
        message: "invalid token",
      },
      { status: 401 }
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: email },
    { $set: { isBanned: true } },
    { new: true }
  );

  if (!updatedUser) {
    return NextResponse.json(
      {
        status: "failed",
        message: "User not found.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: "success",
    message: "User successfully banned!",
  });
}
