"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "@/navigations";

const CheckAuthRedirect = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return <>{children}</>;
};

export default CheckAuthRedirect;
