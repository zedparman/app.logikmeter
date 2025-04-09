import { NextResponse } from "next/server";
import connectDb from "../../../../utils/connectDB";
import Question from "@/models/Question";

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  await connectDb();

  const data = await req.json();
  const { locale } = data;

  const questions = await Question.find({ locale: locale });

  if (!questions) {
    return NextResponse.json(
      { status: "success", message: "okeye", data: [] },
      { status: 200 }
    );
  }
  return NextResponse.json(
    {
      status: "success",
      message: "ok",
      data: questions,
    },
    { status: 200 }
  );
}
