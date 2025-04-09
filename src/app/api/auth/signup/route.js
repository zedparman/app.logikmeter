import { NextResponse } from "next/server";
import validator from "validator";
import User from "@/models/User";
import connectDb from "../../../../../utils/connectDB";
import { generateHashPassword } from "../../../../../utils/auth";

export async function POST(req, res) {
  try {
    await connectDb();
    const data = await req.json();
    const { email, name, lastName, password } = data;
    // console.log(email, name, lastName, password);
    if (!email || !name || !lastName || !password) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Please fill in all fields.",
        },
        { status: 401 }
      );
    }

    if (!validator.isEmail) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Please Add a valid email address.",
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        {
          status: "failed",
          message: "email alredy exits",
        },
        { status: 401 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          status: "failed",
          message: "email alredy exits",
        },
        { status: 401 }
      );
    }

    const hashPassword = await generateHashPassword(password);

    const newUser = new User({
      email: email,
      name: `${name + " " + lastName}`,
      password: hashPassword,
    });

    await newUser.save();
    return NextResponse.json(
      {
        status: "success",
        message: "Register success!",
      },
      {
        headers: { "Set-Cookie": `em=${email};` },
      }
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
