import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import User from "@/models/User";
import Config from "@/models/Config";

export async function POST(req, res) {
  await connectDb();

  const data = await req.json();
  const { name, locale, categoryValue, categoryName } = data;

  const session = await getServerSession({ req });

  if (session == null || !session.user.image) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Invalid token or image is not true",
      },
      { status: 401 }
    );
  }

  const configs = await Config.findOne({ ch: "chacuso" });
  const canCreateValue = configs.canCreate;
  const accountIsRequiredValue = configs.accountIsRequired;
  if (name == "canCreate") {
    // Find all users
    const users = await User.find();

    // Update canCreateQuestion to be the opposite value for all users
    users
      .filter((user) => !user.isModerator)
      .map(async (user) => {
        user.canCreate = !user.canCreate;
        await user.save();
        // console.log(user);
      });
    configs.canCreate = !canCreateValue;
    await configs.save();
    return NextResponse.json({
      status: "success",
      message: "Value of canCreateQuestion reversed for all users",
    });
  }
  if (name == "accountIsRequired") {
    configs.accountIsRequired = !accountIsRequiredValue;
    await configs.save();
    return NextResponse.json({
      status: "success",
      message: "Value of accountIsRequired reversed",
    });
  }
  if (name == "add" && categoryValue.length > 0) {
    if (locale == "fa") {
      const finalObjCategory = {
        label: categoryName,
        value: categoryValue,
      };
      configs.faCategories.push(finalObjCategory);
      await configs.save();
      return NextResponse.json({
        status: "success",
        message: `${finalObjCategory} added to Fa Categories`,
      });
    } else if (locale == "en") {
      const finalObjCategory = {
        label: categoryName,
        value: categoryValue,
      };
      configs.enCategories.push(finalObjCategory);
      await configs.save();
      return NextResponse.json({
        status: "success",
        message: `${finalObjCategory} added to En Categories`,
      });
    }
  }
}
