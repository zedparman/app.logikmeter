// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import User from "@/models/User";

export async function POST(req, res) {
  const data = await req.json();
  const { id, questionId, wallet } = data;
  // await connectDb();
  // console.log(id, questionId, wallet);
  // const user = await User.findOne({ email: userEmail });

  return NextResponse.json({
    status: "success",
    message: "Question successfully created!",
    // data: user.questions,
  });
}
