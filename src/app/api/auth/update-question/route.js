import Question from "@/models/Question";
import connectDb from "../../../../../utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PUT(req, res) {
  await connectDb();

  const data = await req.json();
  const {
    questionId,
    title,
    description,
    options,
    endDate,
    locale,
    categories,
    aboutQuestion,
    questionSummary,
  } = data;

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
  const question = await Question.findOne({ questionId });

  if (!question) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Question not found.",
      },
      { status: 404 }
    );
  }

  const addCategory = () => {
    const data = [];
    categories.map((item) => data.push(item.value));
    return data;
  };

  question.title = title || question.title;
  question.caption = description || question.description;
  question.options = options || question.options;
  question.endDate = endDate || question.endDate;
  question.locale = locale || question.locale;
  question.categories = addCategory() || question.categories;
  question.aboutQuestion = aboutQuestion || question.aboutQuestion;
  question.questionSummary = questionSummary || question.questionSummary;

  await question.save();

  return NextResponse.json({
    status: "success",
    message: "Question successfully updated!",
    data: {
      questionId,
    },
  });
}
