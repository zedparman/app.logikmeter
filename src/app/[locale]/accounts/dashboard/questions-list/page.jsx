import React from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import QuestionCardUser from "@/app/[locale]/components/QuestionsUserList/QuestionCardUser";
import uniqid from "uniqid";

const getQuestion = async (email) => {
  const res = await axios.post(`${process.env.BASE_API}/api/auth/getqu`, {
    userEmail: email,
  });
  return res.data;
};

const QuestionListPage = async () => {
  const session = await getServerSession();
  const res = await getQuestion(session.user.email);
  // console.log({ res });

  return (
    <section className="flex flex-col w-full items-center justify-center p-2">
      <div className="my-5 w-full flex flex-col items-center gap-7">
        {res?.data.length > 0 ? (
          res?.data?.map((item) => (
            <QuestionCardUser key={uniqid()} {...item} />
          ))
        ) : (
          <h1>
            Not found any <span className="text-primary">Question</span>
          </h1>
        )}
      </div>
    </section>
  );
};

export default QuestionListPage;
