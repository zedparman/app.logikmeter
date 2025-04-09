"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Settings, SquarePen, ScrollText } from "lucide-react";
import { Link } from "@/navigations";
import { signOut } from "next-auth/react";
import NavContract from "./NavContract";

export function UserNav({ data, t }) {
  // console.log({ data });
  const name = data.user.name.split("");
  const navItems = [
    { name: t.Home, href: "/", icon: Home },

    {
      name: t.CreateQuestion,
      href: "/accounts/dashboard/create-question",
      icon: SquarePen,
    },
    // {
    //   name: t.QuestionsList,
    //   href: "/questions",
    //   icon: ScrollText,
    // },
    // {
    //   name: t.MyQuestions,
    //   href: "/accounts/dashboard/questions-list",
    //   icon: ScrollText,
    // },
    // {
    //   name: t.saveQuestions,
    //   href: "/accounts/dashboard/save-questions",
    //   icon: ScrollText,
    // },
    { name: t.Settings, href: "/accounts/dashboard/settings", icon: Settings },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={""} alt="user image" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.user?.name}
            </p>
            <p className="text xl leading-none text-muted-foreground ">
              {data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavContract text={t.ConnectWallet} fatext={t.WalletNameS} />
          </DropdownMenuItem>
          {navItems.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link
                href={item.href}
                className="w-full flex justify-between items-center"
              >
                {item.name}
                <span>
                  <item.icon />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <button className="w-full" onClick={() => signOut({ redirect: "/" })}>
          {t.LogOut}
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
