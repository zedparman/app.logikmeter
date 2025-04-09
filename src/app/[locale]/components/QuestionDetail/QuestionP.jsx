import { useParams } from "next/navigation";
import React from "react";
import axios from "axios";
import QuestionDetailCl from "./QuestionDetailCl";

const fetchQuestions = async (pr, locale) => {
  // const res = await fetch(`${pr + `/api/get-questions/`}`, {
  //   cache: "no-store",
  // });
  // const questions = await res.json();
  // return questions;
  const respose = await axios.post(`${pr}/api/questions`, {
    locale,
  });

  return respose.data;
};

const getQuestion = async (id) => {
  const response = await axios.post(
    `${process.env.BASE_API + `/api/get-question/`}`,
    { id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const QuestionP = async ({ params, t, locale, isAuth }) => {
  const res = await getQuestion(params);
  const pr = process.env.BASE_API;
  const questions = await fetchQuestions(pr, locale);
  return (
    <QuestionDetailCl
      t={t}
      locale={locale}
      id={params}
      res={res}
      pr={pr}
      questions={questions}
      isAuth={isAuth}
    />
  );
};

export default QuestionP;
