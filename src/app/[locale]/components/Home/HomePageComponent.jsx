import { Link } from "@/navigations";
import React from "react";
import QuestionsPageComponent from "../Questions/QuestionsPageComponent";
import { Home, Settings, SquarePen, ScrollText } from "lucide-react";
import uniqid from "uniqid";
import { useMessages } from "next-intl";
const HomePageComponent = ({ isAuth, res, fetchFilterData }) => {
  const t = useMessages("SignIn");
  // console.log({rss : res})

  const navItems = [
    { name: t.Dashboard.Home, href: "/", icon: Home },

    {
      name: t.Dashboard.CreateQuestion,
      href: "/accounts/dashboard/create-question",
      icon: SquarePen,
    },
    // {
    //   name: t.Dashboard.QuestionsList,
    //   href: "/questions",
    //   icon: ScrollText,
    // },
    // {
    //   name: t.Dashboard.MyQuestions,
    //   href: "/accounts/dashboard/questions-list",
    //   icon: ScrollText,
    // },
    // {
    //   name: t.Dashboard.saveQuestions,
    //   href: "/accounts/dashboard/save-questions",
    //   icon: ScrollText,
    // },
    {
      name: t.Dashboard.Settings,
      href: "/accounts/dashboard/settings",
      icon: Settings,
    },
  ];
  return (
    <main className="flex flex-col-reverse xl:flex-row-reverse xl:justify-center xl:items-center w-full items-center justify-center bg-card">
      <section className="flex flex-col items-center justify-center w-[80%] mt-5">
        <h1 className="text-2xl font-bold text-primary">LogikMeter</h1>
        <h2 className="mt-5 text-white">{t.Dashboard.Slogan}</h2>
        {/* <h2>{t("subTitle")}</h2> */}
        <QuestionsPageComponent
          t={t.QuestionsPageCom}
          subT={false}
          cop={true}
          placeHoler={t.Dashboard.inpPlace}
          btText={t.Dashboard.inpBtn}
          session={isAuth}
          res={res}
          fetchFilterData={fetchFilterData}
        />
      </section>
    </main>
  );
};

export default HomePageComponent;
