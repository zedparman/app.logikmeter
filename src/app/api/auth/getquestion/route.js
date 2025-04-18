import { NextResponse } from "next/server";
import Question from "@/models/Question";
import connectDb from "../../../../../utils/connectDB";
export async function POST(req, res) {
  const data = await req.json();
  const questionId = data.id;

  await connectDb();

  const questions = await Question.findOne({ questionId });

  if (!questions) {
    return NextResponse.json(
      { status: "failed", message: "Question Not Found", data: [] },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { status: "success", message: "okeye", data: questions },
    { status: 200 }
  );
}
