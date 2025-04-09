import React from "react";
import { useMessages } from "next-intl";
import DashboardNav from "../Nav/DashboardNav";
const HomeSideNv = ({ session , cnf }) => {
  const t = useMessages();
  return <DashboardNav session={session} t={t.Dashboard} cnf={cnf} />;
};

export default HomeSideNv;
