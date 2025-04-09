import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import ChangeLangDropDown from "./ChangeLangDropDown";
import SideNav from "./SideNav";
import { Link } from "@/navigations";
import { useMessages } from "next-intl";
import { UserNav } from "./UserNav";
import Image from "next/image";
const NavBar = ({ session , cnf }) => {
  const t = useMessages("Dasboard");

  return (
    <nav className="p-5 flex justify-between items-center border ">
      <Link href={"/"}>
        {/* <h1>LogikMeter</h1> */}
        <Image
          alt="logo"
          src={"/logo-no-background.png"}
          width={100}
          height={100}
        />
      </Link>
      <div className="flex items-center gap-3">
        {session == null ? <></> : <UserNav t={t.Dashboard} data={session} />}
        <ChangeLangDropDown />
        <ThemeToggle />

        <SideNav t={t} isAuth={session} cnf={cnf} />
      </div>
    </nav>
  );
};

export default NavBar;
