"use client";
import React, { useEffect, useState } from "react";
import QuestionDetailOptionCard from "./QuestionDetailOptionCard";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import useWebShare from "react-use-web-share";
import { Link } from "@/navigations";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QuestionDetailCl = ({ res, t, pr, questions, id, locale, isAuth }) => {
  const { wallet } = useSelector((states) => states.globalStates);
  const { share } = useWebShare();
  const [showAllCounts, setShowAllCounts] = useState(!isAuth ? false : isAuth);
  const [fetchData, setFetchData] = useState(res?.data || {});
  const [haveVersion, setHaveVersion] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [versions, setVersions] = useState(res?.data?.versions || []);
  const [author, setAuthor] = useState(res?.data?.author || "");
  // console.log({ t: res?.data });
  const nCaption = fetchData.caption;
  let editNCaption = `${nCaption}`;

  let findedQuestionIndex = questions?.data?.findIndex(
    (item) => item.questionId == id
  );
  const currentDate = new Date();
  const selectedDate = new Date(fetchData.endDate);
  let nextQuestionObject = questions?.data[findedQuestionIndex + 1];
  let previousQuestionObject = questions?.data[findedQuestionIndex - 1];
  const handleShare = ({ title, text, url }) => {
    share({
      title: title,
      text: text,
      url: url,
    });
  };
  const isPastDate = selectedDate < currentDate;
  const handleCardClick = () => {
    setShowAllCounts(true);
  };

  const versionChangeHandler = async (e) => {
    // console.log({ e });
    const indexTerget = e;
    setIsLoading(true);
    await axios
      .post(`${pr}/api/get-question-versions`, {
        id,
      })
      .then((res) => {
        setAuthor(res.data.author);
        const fetchData = res.data.data;
        const findData = fetchData[indexTerget];
        // console.log({ findData });
        if (findData) {
          setFetchData(findData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    res.data.versions ? setHaveVersion(true) : null;
  }, [res.data]);
  return (
    <section className="relative flex items-center justify-center ">
      {isLoading && (
        <div className="absolute flex justify-center top-0 left-0 w-full h-full bg-black">
          <h1 className="text-3xl font-bold border-2 my-5 h-[70px] rounded-md border-blue-400 animate-pulse p-3">
            {locale == "fa" ? "لطفا منتظر بمانید" : "Loading..."}
          </h1>
        </div>
      )}
      <div className="flex flex-col p-2 w-[90%]">
        <div className="flex flex-col gap-4 p-3">
          <h1 className="text-2xl border-b-2 font-bold border-primary w-auto">
            {fetchData.title}
          </h1>
          <div className="flex gap-3 items-center">
            <TelegramShareButton
              url={`${pr}/${locale}/questions/${fetchData.questionId}`}
              title={fetchData.title}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TwitterShareButton
              url={`${pr}/${locale}/questions/${fetchData.questionId}`}
              title={fetchData.title}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`${pr}/${locale}/questions/${fetchData.questionId}`}
              title={fetchData.title}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={`${pr}/${locale}/questions/${fetchData.questionId}`}
              title={fetchData.title}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <button
              onClick={() =>
                handleShare({
                  text: fetchData.caption,
                  url: `${pr}/${locale}/questions/${fetchData.questionId}`,
                  title: fetchData.title,
                })
              }
            >
              Share 🔗
            </button>
          </div>
          <div className="flex items-center gap-3">
            <h2>{locale == "fa" ? "نسخه انتخابی" : "Selected Version"}:</h2>
            <Select onValueChange={(e) => versionChangeHandler(e)}>
              <SelectTrigger className="w-[180px] bg-primary">
                <SelectValue
                  placeholder={locale == "fa" ? "نسخه" : "version"}
                />
              </SelectTrigger>
              <SelectContent>
                {versions?.map((item, index) => (
                  <SelectItem value={index} key={index}>
                    {locale == "fa"
                      ? `نسخه ${index + 1}`
                      : `Version ${index + 1}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <ForkModal
            t={cr.CreateQuestionPage}
            locale={locale}
            aboutQuestion={res?.data?.aboutQuestion}
            questionSummary={res?.data?.questionSummary}
            categories={res?.data?.categories}
            endDate={res?.data?.endDate}
            questionId={res?.data?.questionId}
          /> */}
          <div className="xl:w-[85%]">
            <div dangerouslySetInnerHTML={{ __html: editNCaption }}></div>
          </div>

          <p className="my-2">
            {t.author}: <span className="text-primary">{author}</span>
          </p>
        </div>
        <div className="flex flex-col p-3 my-5">
          <h1 className="text-xl font-bold mb-2">
            {fetchData?.aboutQuestion ? fetchData?.aboutQuestion : ""}
          </h1>
          <h1 className="text-2xl font-bold">{t.options}</h1>
          <div className="my-5 w-full flex flex-col items-center gap-7">
            {fetchData?.options?.map((item) => (
              <QuestionDetailOptionCard
                showAllCounts={showAllCounts}
                showVoteHandler={handleCardClick}
                wallet={wallet}
                questionId={fetchData.questionId}
                isPastDate={isPastDate}
                key={uniqid()}
                pr={pr}
                {...item}
                t={t}
              />
            ))}
          </div>
        </div>
        <div
          className={`flex flex-col md:flex-row gap-3 ${
            locale == "fa" ? "" : "md:flex-row-reverse"
          } justify-between items-center`}
        >
          {locale == "fa" ? (
            questions?.data[findedQuestionIndex - 1] !== undefined ? (
              <Link
                href={`/questions/${previousQuestionObject?.questionId}`}
                className="flex flex-col border-2 rounded-lg border-primary p-2 w-[90%] xl:w-[25%]"
              >
                <h1>{locale == "fa" ? t.nextQuestion : t.previousQuestion}</h1>
                <h2 className="">
                  {questions?.data[findedQuestionIndex - 1]?.title}
                </h2>
              </Link>
            ) : (
              ""
            )
          ) : questions?.data[findedQuestionIndex + 1] !== undefined ? (
            <Link
              href={`/questions/${nextQuestionObject?.questionId}`}
              className="flex flex-col border-2 rounded-lg border-primary p-2 w-[90%] xl:w-[25%]"
            >
              <h1>{locale == "fa" ? t.previousQuestion : t.nextQuestion}</h1>
              <h2 className="">
                {questions?.data[findedQuestionIndex + 1]?.title}
              </h2>
            </Link>
          ) : (
            ""
          )}
          {locale == "fa" ? (
            questions?.data[findedQuestionIndex + 1] !== undefined ? (
              <Link
                href={`/questions/${nextQuestionObject?.questionId}`}
                className="flex flex-col border-2 rounded-lg border-primary p-2 w-[90%] xl:w-[25%]"
              >
                <h1>{locale == "fa" ? t.previousQuestion : t.nextQuestion}</h1>
                <h2 className="">
                  {questions?.data[findedQuestionIndex + 1]?.title}
                </h2>
              </Link>
            ) : (
              ""
            )
          ) : questions?.data[findedQuestionIndex - 1] !== undefined ? (
            <Link
              href={`/questions/${previousQuestionObject?.questionId}`}
              className="flex flex-col border-2 rounded-lg border-primary p-2 w-[90%] xl:w-[25%]"
            >
              <h1>{locale == "fa" ? t.nextQuestion : t.previousQuestion}</h1>
              <h2 className="">
                {questions?.data[findedQuestionIndex - 1]?.title}
              </h2>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestionDetailCl;
