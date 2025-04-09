import React from "react";
import Questionjkl from "./Questionjkl";

const QuestionsPageComponent = async ({
  t,
  subT,
  cop,
  placeHoler,
  btText,
  session,
  res,
  fetchFilterData,
}) => {
  // const res = await getAllQuestions();
  // console.log({res : res.data})

  return (
    <Questionjkl
      res={res?.data}
      t={t}
      subT={subT}
      cop={cop}
      placeHoler={placeHoler}
      btText={btText}
      session={session}
      pr={process.env.BASE_API}
      fetchFilterData={fetchFilterData}
    />
  );
};

export default QuestionsPageComponent;
