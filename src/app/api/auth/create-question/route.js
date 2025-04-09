import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";

import User from "@/models/User";
import Question from "@/models/Question";
import uniqid from "uniqid";
import slugify from "slugify";

export async function POST(req, res) {
  await connectDb();

  const data = await req.json();
  const {
    title,
    description,
    options,
    endDate,
    inpSlug,
    locale,
    categories,
    aboutQuestion,
    questionSummary,
  } = data;
  // console.log({ questionSummary });
  const removeTitleSpace = slugify(title);
  const removeUserSlug = inpSlug.length > 0 ? slugify(inpSlug) : "";

  const oldTitle = `${title + " " + uniqid()}`;
  const convertTitle = slugify(oldTitle);
  const finalInpSlug = `${slugify(inpSlug)}-${uniqid()}`;
  const finalSlug = inpSlug.length > 0 ? finalInpSlug : convertTitle;

  if (!title || !options) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Please fill in all fields.",
      },
      { status: 401 }
    );
  }

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

  const questions = await Question.find({});
  const newEndDate = endDate == undefined ? "01" : endDate;
  // console.log(newEndDate);

  const user = await User.findOne({ email: session.user.email });
  // console.log({ user });
  if (!user) {
    return NextResponse.json(
      {
        status: "failed",
        message: "User not found.",
      },
      { status: 404 }
    );
  }
  if (user?.canCreate == false) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Question creation is currently closed",
      },
      { status: 404 }
    );
  }
  if (user?.isBanned == true) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Your account has been blocked",
      },
      { status: 404 }
    );
  }
  const slugHanlder = async () => {
    if (inpSlug.length > 0) {
      const findQuestion = questions.find(
        (question) => question.questionId == removeUserSlug
      );
      if (findQuestion) {
        const finalInpSlug = `${removeUserSlug}-${uniqid()}`;
        return finalInpSlug;
      } else if (!findQuestion) {
        return removeUserSlug;
      }
    } else {
      const findQuestion = questions.find(
        (question) => question.questionId == removeTitleSpace
      );
      if (findQuestion) {
        return convertTitle;
      } else if (!findQuestion) {
        return removeTitleSpace;
      }
    }
  };
  const addCategory = () => {
    const data = [];
    categories.map((item) => data.push(item.value));
    return data;
  };
  const authorName = user?.name;
  // console.log(authorName);
  const handledSlug = await slugHanlder();
  // console.log({handledSlug})
  const newQuestion = new Question({
    questionId: handledSlug,
    author: authorName,
    title: title,
    caption: description,
    options: options,
    endDate: endDate,
    locale: locale,
    categories: addCategory(),
    aboutQuestion: aboutQuestion,
    questionSummary: questionSummary,
    versions: [
      {
        title: title,
        caption: description,
        options: options,
        endDate: endDate,
        locale: locale,
        categories: addCategory(),
        aboutQuestion: aboutQuestion,
        questionSummary: questionSummary,
      },
    ],
  });
  // console.log(newQuestion);

  await newQuestion.save();

  await user?.questions?.push(newQuestion);

  await user.save();

  return NextResponse.json({
    status: "success",
    message: "Question successfully created!",
    data: {
      url: handledSlug,
    },
  });
}
