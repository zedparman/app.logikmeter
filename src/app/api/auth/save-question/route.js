import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";

import User from "@/models/User";

export async function POST(req, res) {
  await connectDb();

  const data = await req.json();
  const { options } = data;

  if (!options) {
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

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json(
      {
        status: "failed",
        message: "User not found.",
      },
      { status: 404 }
    );
  }

  await user?.saveQuestions?.push(options);

  await user.save();

  return NextResponse.json({
    status: "success",
    message: "Question successfully created!",
  });
}
