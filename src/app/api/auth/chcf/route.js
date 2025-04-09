import { NextResponse } from "next/server";
import Config from "@/models/Config";
import connectDb from "../../../../../utils/connectDB";

export async function GET(req, res) {
  try {
    await connectDb();
    const configs = await Config.findOne({ ch: "chacuso" });

    // console.log({ configs });
    return NextResponse.json({
      status: "success",
      message: "added success!",
      data: configs,
    });
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
