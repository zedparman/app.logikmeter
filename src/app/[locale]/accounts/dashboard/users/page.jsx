import UsersForAdminTemplate from "@/app/[locale]/components/Dashboard/users/UsersForAdminTemplate";
import { getServerSession } from "next-auth";
import React from "react";
export default async function UseresPageForAdmin({ params: { locale } }) {
  const session = await getServerSession();
  if (session?.user?.image == false) {
    redirect("/");
  }

  return <UsersForAdminTemplate pr={process.env.BASE_API} locale={locale} />;
}
