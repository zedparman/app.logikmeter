import Question from "@/models/Question";
import { NextResponse } from "next/server";
import connectDb from "../../../../utils/connectDB";

export async function POST(req, res) {
  const data = await req.json();
  const { quId, id, wallet } = data;

  await connectDb();

  const question = await Question.findOne({ questionId: quId });

  let saw = question.options.find((item) => item.id == id);
  // console.log({ saw });
  // let sgh = saw.voters.map((item) => item.wallet ==wallet);
  saw.count++;

  await saw.voters.push({ wallet: wallet });

  await question.save();

  return NextResponse.json({
    status: "success",
    message: "Question successfully created!",
  });
}
