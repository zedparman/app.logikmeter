import React from "react";
import Image from "next/image";
import { Link } from "@/navigations";
import { Button } from "@/components/ui/button";
const QuestionCardUser = ({ title, caption, questionId }) => {
  return (
    <div className="flex w-[80%] border-2 border-primary p-3 rounded-md">
      <div className="w-full">
        <h1 className="text-2xl w-full border-b-2 border-primary">{title}</h1>
        <p className="text-primary-foreground w-full text-base my-5">
          {caption}
        </p>
        <div className="flex items-center gap-2">
          <Link href={`/questions/${questionId}`}>
            <Button>Details</Button>
          </Link>
          <Link href={`/accounts/dashboard/questions-list/${questionId}`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </div>
      {/* <Image src={""} alt="" width={""} height={""} />  */}
    </div>
  );
};

export default QuestionCardUser;
