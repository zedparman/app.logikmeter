// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const data = await req.json();

  return NextResponse.json({
    status: "success",
    message: "Question successfully created!",
    session: data,
  });
}
