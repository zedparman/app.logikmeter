import React from "react";
import CreateQuestionForm from "./CreateQuestionForm";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "@/navigations";

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

const CreateQuestionComponent = async ({ t, params }) => {
  const session = await getServerSession();
  // console.log({ session: session.user.image });
  const res = await getQuestion(session.user.email);
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
      <CreateQuestionForm
        t={t}
        savedOptions={res}
        locale={params.locale}
        filterOptions={fetchFilterOptionsData}
      />
    </section>
  );
};

export default CreateQuestionComponent;
