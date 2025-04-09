// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Question from "@/models/Question";

export async function POST(req, res) {
  try {
    await connectDb();

    const data = await req.json();
    const { id, wallet, questionId } = data;

    const question = await Question.findOne({ questionId: questionId });
    // console.log({ question });

    const option = question.options.find((opt) => opt.id === id);
    // console.log({ option });

    await option.voters.push({ wallet: wallet });
    option.count++;

    await question.save();

    return NextResponse.json(
      { status: "success", message: "submit!" },
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
