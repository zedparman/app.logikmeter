import { NextResponse } from "next/server";
import connectDb from "../../../../utils/connectDB";
import Question from "@/models/Question";

export const dynamic = "force-dynamic"

export async function GET() {
  await connectDb();
  const questions = await Question.find({});
  // console.log({ questions });
  if (!questions) {
    return NextResponse.json(
      { status: "success", message: "okeye", data: [] },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { status: "success", message: "okeye", data: questions },
    { status: 200 }
  );
}
