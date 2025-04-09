import React from "react";
import axios from "axios";
import QuestionWithM from "../../components/QuestionDetail/QuestionWithM";
import { getServerSession } from "next-auth";

export async function generateMetadata(props) {
  // read route params
  const id = props.params.questionId;

  // fetch data
  const response = await axios.post(
    `${process.env.BASE_API + `/api/get-question/`}`,
    { id: id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = response.data.data;
  // console.log({ res });

  return {
    title: `LogikMeter | ${res.title}`,
    description: res.caption,
    openGraph: {
      // images: ["/some-specific-page-image.jpg", ...previousImages],
      title: `LogikMeter | ${res.title}`,
      description: res.caption,
      url: "https://logikmeter.com",
      siteName: "Logikmeter",
      type: "website",
    },
  };
}

export default async function QuestionId(props) {
  // console.log({ props });
  const session = await getServerSession();
  const checkIsAuth = session?.user?.image ? true : false;
  return (
    <QuestionWithM
      params={props.params.questionId}
      locale={props.params.locale}
      isAuth={checkIsAuth}
    />
  );
}
