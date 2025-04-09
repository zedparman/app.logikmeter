"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/navigations";
import { usePathname } from "next/navigation";

function ChangeLangDropDown() {
  const pathName = usePathname();
  const LangName = pathName.split("/")[1];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{LangName.toLocaleUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Change Lang</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/"} locale="fa">
          <DropdownMenuItem>Fa</DropdownMenuItem>
        </Link>
        <Link href={"/"} locale="en">
          <DropdownMenuItem>En</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ChangeLangDropDown;
