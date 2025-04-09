import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "../../../../../utils/auth";

export async function POST(req, res) {
  try {
    await connectDb();

    const data = await req.json();
    const { name, lastName, password } = data;
    // console.log(name, lastName, password);
    if (!name || !lastName || !password) {
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

    const user = await User.findOne({ email: session?.user?.email });
    // console.log(user);

    const checkPassword = await verifyPassword(password, user?.password);
    // console.log(checkPassword);
    if (!checkPassword) {
      return NextResponse.json(
        {
          status: "failed",
          message: "password is incorrect!",
        },
        { status: 401 }
      );
    }

    user.name = `${name + " " + lastName}`;
    await user.save();
    return NextResponse.json(
      { status: "success", message: "update info is completed!" },
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
