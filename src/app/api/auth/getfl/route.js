import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import Config from "@/models/Config";

export async function POST(req, res) {
  try {
    const data = await req.json();
    const { locale } = data;
    // console.log({ session });
    await connectDb();

    const configs = await Config.findOne({ ch: "chacuso" });
    const dataHandler = (locale) => {
      if (locale == "fa") {
        const finalData = [];
        configs.faCategories.map((item) =>
          finalData.push({ label: item.label, value: item.value })
        );
        return finalData;
      } else if (locale == "en") {
        const finalData = [];
        configs.enCategories.map((item) =>
          finalData.push({ label: item.label, value: item.value })
        );
        return finalData;
      }
    };
    const fData = dataHandler(locale);

    return NextResponse.json(
      { status: "success", message: "okeye", data: fData },
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
