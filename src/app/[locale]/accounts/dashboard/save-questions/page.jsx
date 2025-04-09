import React from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import QuestionCardUser from "@/app/[locale]/components/QuestionsUserList/QuestionCardUser";
import uniqid from "uniqid";

const getQuestion = async (email) => {
  const res = await axios.post(`${process.env.BASE_API}/api/auth/getqusa`, {
    userEmail: email,
  });
  return res.data;
};

const QuestionListPage = async () => {
  const session = await getServerSession();
  const res = await getQuestion(session.user.email);
  // console.log({ ressss: res.data });

  return (
    <section className="flex flex-col w-full items-center justify-center p-2">
      <h1 className="text-3xl font-bold text-primary">Options</h1>
      <div className="my-5 w-full flex flex-col items-center gap-7">
        {res?.data?.length > 0 ? (
          res?.data?.map((item, index) => (
            // <QuestionCardUser key={uniqid()} {...item} />

            <div className="flex flex-col gap-4" key={index}>
              <div className="border border-primary flex  gap-3 flex-wrap p-2 rounded-sm ">
                {item.map((element) => (
                  <>
                    <h1>{element.title}</h1>
                  </>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h1>
            Not found any <span className="text-primary">Saved Question</span>
          </h1>
        )}
      </div>
    </section>
  );
};

export default QuestionListPage;
