"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/navigations";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";

const sendVote = async (id, wallet, questionId, pr) => {
  const getIp = await axios.get("https://api.ipify.org/?format=json");
  let ip = getIp.data.ip;
  const res = await axios.post(`${pr}/api/auth/ssop`, {
    questionId: questionId,
    optionId: id,
    walletStr: wallet,
    ip,
  });
  console.log(res);

  return res.data;
};

const QuestionDetailOptionCard = ({
  title,
  desc,
  id,
  wallet,
  questionId,
  count,
  isPastDate,
  t,
  pr,
  showVoteHandler,
  showAllCounts,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const send = async () => {
    setIsLoading(true);
    await sendVote(id, wallet, questionId, pr)
      .then((res) => {
        showVoteHandler();
        // console.log("success", res);
        setIsLoading(false);
        toast.success("success");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="flex w-full xl:w-[80%] border-2 border-primary p-3 rounded-md">
      <div className="w-full">
        <h1 className="xl:text-2xl w-full border-b-2 border-primary ">
          {title}
        </h1>
        <p className="text-primary-foreground w-full text-base my-5">{desc}</p>
        <div className="w-full flex flex-row-reverse justify-between items-center">
          <p>
            {t.voteCount}: {showAllCounts ? count : "*****"}
          </p>
          <Button onClick={send} disabled={isPastDate || isLoading}>
            {isLoading ? <PulseLoader color="#ffff" size={"5px"} /> : t.vote}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailOptionCard;
