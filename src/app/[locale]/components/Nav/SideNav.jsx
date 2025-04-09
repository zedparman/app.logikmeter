import React from "react";
import { useMessages } from "next-intl";
import SideNavC from "./SideNavC";

const SideNav = ({ isAuth , cnf }) => {
  const t = useMessages("Index");

  return <SideNavC t={t} isAuth={isAuth} cnf={cnf} />;
};

export default SideNav;
