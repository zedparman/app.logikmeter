import React from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "@/navigations";
import EditQuestionForm from "./EditQuestionForm";

const getQuestion = async (email) => {
  const res = await axios.post(`${process.env.BASE_API}/api/auth/getqusa`, {
    userEmail: email,
  });
  return res.data;
};

const checkCanCreate = async () => {
  const res = await fetch(`${process.env.BASE_API}/api/auth/chcf`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};
const filterOptions = async (locale) => {
  const res = await axios.post(`${process.env.BASE_API}/api/auth/getfl`, {
    locale: locale,
  });
  return res.data;
};

const getQuestionData = async (id) => {
  const response = await axios.post(
    `${process.env.BASE_API + `/api/auth/getquestion`}`,
    { id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log({ response });
  return response.data;
};

const EditQuestionComponent = async ({ t, params }) => {
  const session = await getServerSession();
  // console.log({ params: params.questionId });
  const res = await getQuestion(session.user.email);
  const questionData = await getQuestionData(params.questionId);
  const checkCanCreateQuestion = await checkCanCreate();
  const fetchFilterOptionsData = await filterOptions(params.locale);
  // console.log({ checkCanCreateQuestion: checkCanCreateQuestion.data });
  if (
    (checkCanCreateQuestion.data.canCreate !== true &&
      session.user.image == false) ||
    null
  ) {
    redirect("/");
  }
  return (
    <section>
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="my-4 text-lg">{t.subTitle}</p>
      <EditQuestionForm
        t={t}
        savedOptions={res}
        questionData={questionData}
        locale={params.locale}
        filterOptions={fetchFilterOptionsData}
      />
    </section>
  );
};

export default EditQuestionComponent;
