"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/navigations";
import {
  Home,
  Settings,
  SquarePen,
  ScrollText,
  UsersRound,
} from "lucide-react";

import uniqid from "uniqid";

const SideNavC = ({ isAuth, t, cnf }) => {
  const navItems = [
    { name: t.Dashboard.Home, href: "/", icon: Home },
    {
      name: t.Dashboard.CreateQuestion,
      href: "/accounts/dashboard/create-question",
      icon: SquarePen,
    },
    // {
    //   name: t.Dashboard.QuestionsList,
    //   href: "/questions",
    //   icon: ScrollText,
    // },
    // {
    //   name: t.Dashboard.MyQuestions,
    //   href: "/accounts/dashboard/questions-list",
    //   icon: ScrollText,
    // },
    // {
    //   name: t.Dashboard.saveQuestions,
    //   href: "/accounts/dashboard/save-questions",
    //   icon: ScrollText,
    // },
    {
      name: t.Dashboard.Settings,
      href: "/accounts/dashboard/settings",
      icon: Settings,
    },
  ];
  if (cnf?.canCreate == false) {
    navItems.splice(1, 1);
  }
  const AdminNav = [
    { name: t.Dashboard.Home, href: "/", icon: Home },
    {
      name: t.Dashboard.Users,
      href: "/accounts/dashboard/users",
      icon: UsersRound,
    },
    {
      name: t.Dashboard.CreateQuestion,
      href: "/accounts/dashboard/create-question",
      icon: SquarePen,
    },

    {
      name: t.Dashboard.MyQuestions,
      href: "/accounts/dashboard/questions-list",
      icon: ScrollText,
    },
    {
      name: t.Dashboard.Settings,
      href: "/accounts/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">
          <RxHamburgerMenu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>LogikMeter</Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          {isAuth == null ? (
            <>
              <SheetClose asChild>
                <Link href={"/signin"}>{t.Index.signIn}</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/signup"}>{t.Index.signUp}</Link>
              </SheetClose>
              {/* <Link href={"/questions"}>{t.Index.questions}</Link> */}
            </>
          ) : isAuth?.user?.image ? (
            AdminNav.map((item) => (
              <SheetClose asChild key={uniqid()}>
                <Link
                  href={item.href}
                  className="w-full flex justify-between items-center hover:bg-card p-2"
                >
                  {item.name}
                  <span>
                    <item.icon />
                  </span>
                </Link>
              </SheetClose>
            ))
          ) : (
            navItems.map((item) => (
              <SheetClose asChild key={uniqid()}>
                <Link
                  href={item.href}
                  className="w-full flex justify-between items-center hover:bg-card p-2"
                >
                  {item.name}
                  <span>
                    <item.icon />
                  </span>
                </Link>
              </SheetClose>
            ))
          )}
        </div>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavC;
