import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import connectDb from "../../../../../utils/connectDB";
export async function POST(req, res) {
  try {
    const session = await getServerSession({ req });
    // console.log({ session });
    await connectDb();

    const users = await User.find({});

    return NextResponse.json(
      { status: "success", message: "okeye", data: users },
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
