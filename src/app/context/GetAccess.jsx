"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "@/navigations";

const GetAccess = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session == null) {
    redirect("/signin");
  }
  return <>{children}</>;
};

export default GetAccess;
