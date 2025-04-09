import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import Question from "@/models/Question";
import User from "@/models/User";

export async function POST(req, res) {
  await connectDb();

  const data = await req.json();
  const { questionId } = data;

  if (!questionId) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Failed",
      },
      { status: 401 }
    );
  }

  const session = await getServerSession({ req });

  if (session == null) {
    return NextResponse.json(
      {
        status: "failed",
        message: "invalid token",
      },
      { status: 401 }
    );
  }

  // ابتدا سوال و یوزر مرتبط با ان را پیدا می‌کنیم
  const question = await Question.findOneAndDelete({ questionId: questionId });

  if (!question) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Question not found.",
      },
      { status: 404 }
    );
  }

  // یوزر مرتبط با سوال
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

  // حذف سوال از لیست سوالات یوزر
  user.questions = user.questions.filter(
    (item) => item.questionId !== questionId
  );
  await user.save();

  return NextResponse.json({
    status: "success",
    message: "Question successfully deleted!",
  });
}
