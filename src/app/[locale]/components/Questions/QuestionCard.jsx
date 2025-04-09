"use client";
import React from "react";
import { Link } from "@/navigations";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import HTML2JSX from "convert-html-to-jsx";

const QuestionCard = ({
  t,
  title,
  caption,
  questionId,
  session,
  pr,
  questionSummary,
}) => {
  const router = useRouter();

  const deleteQuestion = async () => {
    await axios
      .post(`${pr}/api/auth/deleteq`, {
        questionId: questionId,
      })
      .then((res) => {
        // console.log(res);
        toast.success("success");
        router.refresh();
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  let editNCaption = `${caption}`;

  // console.log({ questionSummary, editNCaption });
  return (
    <div className="flex w-[100%] border-2 border-primary p-3 rounded-md">
      <div className="w-full">
        <h1 className="text-2xl w-full border-b-2 border-primary">{title}</h1>
        {/* <p className="text-primary-foreground w-full text-base my-5">
          {caption}
        </p> */}

        <div className="my-5">
          {editNCaption.startsWith("<p") ? (
            <h2>{questionSummary}</h2>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: editNCaption }}></div>
          )}
          {/* <HTML2JSX innerHTML={editNCaption} /> */}
          {/* <h2>{questionSummary}</h2>
          <div dangerouslySetInnerHTML={{ __html: editNCaption }}></div> */}
        </div>

        <div className="flex gap-3 items-center">
          <Link href={`/questions/${questionId}`}>
            <Button>{t.Details}</Button>
          </Link>
          {session?.user?.image ? (
            // <Button
            //   onClick={deleteQuestion}
            //   className="bg-black text-red-300 border border-primary"
            // >
            //   {t.Delete}
            // </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-black text-red-300 border border-primary"
                  variant="outline"
                >
                  {t.Delete}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t.Delete}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                  <div className="items-center mb-5">
                    <Label htmlFor="name" className="text-right">
                      {title}
                    </Label>
                  </div>
                  <div className="items-center h-48 overflow-y-scroll">
                    <p>{questionSummary}</p>
                    <div
                      dangerouslySetInnerHTML={{ __html: editNCaption }}
                    ></div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      className="bg-black text-red-300 border border-primary"
                      onClick={deleteQuestion}
                    >
                      {t.Delete}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
