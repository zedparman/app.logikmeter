import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import Question from "@/models/Question";
export async function GET(req, res) {

  // console.log(req.query)
  await connectDb();

  const questions = await Question.find({});

  if (!questions) {
    return NextResponse.json(
      { status: "success", message: "okeye", data: [] },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { status: "success", message: "okeye", data: questions },
    { status: 200 }
  );
}
