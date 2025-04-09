import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import Question from "@/models/Question";

export async function POST(req, res) {
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

  // const newVersion = {
  //   // versionNumber: question.versions.length + 1,
  //   title: title,
  //   caption: description,
  //   options: options,
  //   endDate: endDate,
  //   categories: categories.map((item) => item.value),
  //   aboutQuestion: aboutQuestion,
  //   questionSummary: questionSummary,
  //   dateModified: new Date(),
  // };
  const newVersion = {
    title: title,
    caption: description,
    options: options,
    endDate: endDate,
    locale: locale,
    categories: addCategory(),
    aboutQuestion: aboutQuestion,
    questionSummary: questionSummary,
  };

  // console.log({ newVersion });
  // console.log("first");
  await question.versions.push(newVersion);
  await question.save();

  return NextResponse.json({
    status: "success",
    message: "Question version successfully updated!",
  });
}
