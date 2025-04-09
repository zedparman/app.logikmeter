import React from "react";
import QuestionP from "./QuestionP";
import { useMessages } from "next-intl";

const QuestionWithM = ({ params, locale, isAuth }) => {
  const t = useMessages("SignIn");

  return (
    <QuestionP
      params={params}
      t={t.QuestionDetailCom}
      locale={locale}
      isAuth={isAuth}
    />
  );
};

export default QuestionWithM;
