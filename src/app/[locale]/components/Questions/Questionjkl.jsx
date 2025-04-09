"use client";
import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/navigations";
import { useSearchParams } from "next/navigation";
const Questionjkl = ({
  res,
  t,
  subT,
  cop,
  placeHoler,
  session,
  pr,
  fetchFilterData,
}) => {
  const params = useSearchParams();
  const categoryName = params.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const showLabelForUsersHandler = () => {
    const labelResult = fetchFilterData.find(
      (item) => item.value == categoryName
    );
    return (
      <p className="mt-4 text-lg">
        {t.categoryTitle} : {labelResult.label}
      </p>
    );
  };
  const filteredData = res
    ?.filter((item) => {
      if (categoryName) {
        return (
          item.categories.includes(categoryName) &&
          item.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return item.title?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    })
    .reverse();
  return (
    <section className="flex flex-col w-full items-center justify-center p-2">
      {subT ? (
        <h1 className="text-2xl font-bold text-primary">{t.title}</h1>
      ) : (
        ""
      )}
      <input
        type="text"
        placeholder={placeHoler}
        className="w-full p-2 my-5 rounded-lg outline-none md:w-[50%]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AlertDialog>
        <AlertDialogTrigger className="bg-primary px-7 py-2 rounded-lg ">
          {t.filterBtn}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogCancel className={"w-[50px]"}>
            <X />
          </AlertDialogCancel>
          <div className="flex flex-wrap gap-3">
            <AlertDialogCancel
              className="flex gap-2 items-center"
              disabled={categoryName == null ? true : false}
            >
              <Link href={`/`}>{t.removeFilter}</Link>
            </AlertDialogCancel>
            {fetchFilterData.map((item, index) => (
              <Link href={`/?category=${item.value}`} key={index}>
                <AlertDialogAction className="flex gap-2 items-center bg-black">
                  <Checkbox
                    className={"border border-white"}
                    checked={categoryName == item.value ? true : false}
                  />
                  {item.label}
                </AlertDialogAction>
              </Link>
            ))}
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {categoryName == null ? "" : showLabelForUsersHandler()}

      {cop ? (
        <div className="my-5 w-full flex flex-col items-center gap-7">
          {filteredData?.map((item) => (
            <QuestionCard
              key={item._id}
              t={t}
              path={"60"}
              {...item}
              session={session}
              pr={pr}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Questionjkl;
