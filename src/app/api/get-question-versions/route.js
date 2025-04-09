import { NextResponse } from "next/server";
import connectDb from "../../../../utils/connectDB";
import Question from "@/models/Question";

export async function POST(req, res) {
  const data = await req.json();
  const questionId = data.id;

  await connectDb();

  const question = await Question.findOne({ questionId });

  if (!question) {
    return NextResponse.json(
      { status: "failed", message: "Question Not Found", data: [] },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { status: "success", message: "Found Versions", data: question.versions },
    { status: 200 }
  );
}
