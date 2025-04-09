"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { validateSchemaCreateQuestion } from "@/schema/validateSchema";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { MultiSelect } from "react-multi-select-component";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputDatePicker } from "jalaali-react-date-picker";
import "./PersianDate/PersainDate.css";

import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";
import { i18nChangeLanguage } from "@wangeditor/editor";

const EditQuestionForm = ({
  t,
  savedOptions,
  locale,
  filterOptions,
  questionData,
}) => {
  i18nChangeLanguage("en");
  const schemaValidate = validateSchemaCreateQuestion(t);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenSecondDialog, setIsOpenSecondDialog] = useState(false);
  const [requestType, setRequestType] = useState(null);

  const fetchedData = questionData.data;

  const [optionData, setOptionData] = useState({
    title: "",
    desc: "",
  });
  const [finalOptions, setFinalOptions] = useState(fetchedData.options);

  // Editor
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState(fetchedData.caption);
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "Type here...",
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  const [date, setDate] = useState(fetchedData.endDate);
  const [nD, setND] = useState(fetchedData.endDate);
  const [nDD, setNDD] = useState();
  const handleDate = (e) => {
    setNDD(e);
    let dt = `${e?._d}`;
    setND(dt);
  };

  const [filterValue, setFilterValue] = useState([]);
  const clickHander = () => {
    const updatedOptions = [
      ...finalOptions,
      {
        id: `${uniqid()}`,
        title: optionData.title,
        desc: optionData.desc,
        count: 0,
        voters: [],
      },
    ];
    setFinalOptions(updatedOptions);
    setIsOpenDialog(false);
    setOptionData({
      title: "",
      desc: "",
    });
  };
  const updateQuestion = async (data) => {
    const { inpTitle, inpSlug, aboutQuestion, questionSummary } = data;
    await axios
      .put(
        "/api/auth/update-question",
        {
          title: inpTitle,
          description: html,
          options: finalOptions,
          endDate: locale == "fa" ? nD : date,
          inpSlug,
          locale,
          categories: filterValue,
          aboutQuestion: aboutQuestion,
          questionSummary: questionSummary,
          questionId: fetchedData.questionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        // router.push(`/questions/${res.data.data.url}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const addNewVersion = async (data) => {
    const { inpTitle, inpSlug, aboutQuestion, questionSummary } = data;
    await axios
      .post(
        "/api/auth/add-version",
        {
          title: inpTitle,
          description: html,
          options: finalOptions,
          endDate: locale == "fa" ? nD : date,
          inpSlug,
          locale,
          categories: filterValue,
          aboutQuestion: aboutQuestion,
          questionSummary: questionSummary,
          questionId: fetchedData.questionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        // router.push(`/questions/${res.data.data.url}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      inpTitle: fetchedData.title,
      inpSubTitle: "",
      inpSlug: "",
      aboutQuestion: fetchedData.aboutQuestion,
      questionSummary: fetchedData.questionSummary,
    },
    validationSchema: schemaValidate,
    onSubmit: async (values) => {
      if (requestType === "update") {
        await updateQuestion(values);
      } else if (requestType === "newVersion") {
        await addNewVersion(values);
      }
    },
  });

  const handleSaveOption = (options) => {
    setIsOpenSecondDialog(false);
    const updatedOptions = [...finalOptions, ...options];
    setFinalOptions(updatedOptions);
  };

  const handleUpdateClick = () => {
    if (!formik.isSubmitting) {
      setRequestType("update");
      formik.handleSubmit();
    }
  };

  const handleAddNewVersionClick = () => {
    if (!formik.isSubmitting) {
      setRequestType("newVersion");
      formik.handleSubmit();
    }
  };
  return (
    <section className="my-5 flex flex-col">
      <form
        className="flex flex-col my-5 gap-5 w-full "
        onSubmit={formik.handleSubmit}
      >
        <div className="space-y-2">
          <Label>{t.inpTitle}</Label>
          <Input
            type="text"
            name="inpTitle"
            className="border border-primary"
            value={formik.values.inpTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.inpTitle && (
            <p className="text-xs text-red-500">{formik.errors.inpTitle}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>{t.inpSubTitle}</Label>
          <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: "1px solid #ccc" }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={(editor) => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: "500px", overflowY: "hidden" }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t.inpSlug}</Label>
          <Input
            type="text"
            name="inpSlug"
            className="border border-primary"
            value={formik.values.inpSlug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-200">{t.AboutSlug}</p>
        </div>
        <div>
          <h1>{t.category}</h1>
          <MultiSelect
            options={filterOptions?.data}
            value={filterValue}
            onChange={setFilterValue}
            labelledBy="Select"
            className="text-black w-[90%]"
          />
        </div>
        <div>
          {locale == "fa" ? (
            <InputDatePicker value={nDD} onChange={(e) => handleDate(e)} />
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          <p className="text-xs text-primary my-2">{t.descDate}</p>
        </div>
        <div className="space-y-2">
          <Label>{t.aboutQuestion}</Label>
          <Input
            type="text"
            name="aboutQuestion"
            className="border border-primary"
            value={formik.values.aboutQuestion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.aboutQuestion && (
            <p className="text-xs text-red-500">
              {formik.errors.aboutQuestion}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>{t.questionSummary}</Label>
          <Input
            type="text"
            name="questionSummary"
            className="border border-primary"
            value={formik.values.questionSummary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.questionSummary && (
            <p className="text-xs text-red-500">
              {formik.errors.questionSummary}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-6 my-5">
          {finalOptions?.map((item) => (
            <div
              key={uniqid()}
              className="flex w-[80%] border-2 border-primary p-3 rounded-md"
            >
              <div>
                <h1 className="text-2xl border-b-2 border-primary w-auto">
                  {item.title}
                </h1>
                <p className="text-primary-foreground text-base my-5">
                  {item.desc}
                </p>
                <button
                  className="bg-primary p-2 rounded-md"
                  onClick={() => {
                    const update = finalOptions.filter(
                      (oldItem) => oldItem.id !== item.id
                    );
                    setFinalOptions(update);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <Dialog open={isOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpenDialog(true)} variant="outline">
              {t.addB}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t.addBTitle}</DialogTitle>
              <DialogDescription>{t.addBCaption}</DialogDescription>
            </DialogHeader>
            <div>
              <div>
                <Label>{t.addInpTitle}</Label>
                <Input
                  type="text"
                  value={optionData.title}
                  onChange={(e) =>
                    setOptionData({ ...optionData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>{t.addInpCaption}</Label>
                <Input
                  type="text"
                  value={optionData.desc}
                  onChange={(e) =>
                    setOptionData({ ...optionData, desc: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <div className="w-full flex justify-between">
                <Button type="submit" onClick={clickHander}>
                  Save
                </Button>
                <Button onClick={() => setIsOpenDialog(false)}>Cancel</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isOpenSecondDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsOpenSecondDialog(true)}
              variant="outline"
            >
              {t.addBSave}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t.addBTitle}</DialogTitle>
              <DialogDescription>{t.addBCaption}</DialogDescription>
            </DialogHeader>
            <div>
              {savedOptions?.data == undefined || null ? (
                <h1>Not found!</h1>
              ) : (
                <div className="flex flex-col gap-4">
                  {savedOptions?.item?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSaveOption(item)}
                      className="border border-primary flex  gap-3 flex-wrap p-2 rounded-sm cursor-pointer"
                    >
                      {item.map((element) => (
                        <>
                          <h1>{element.title}</h1>
                        </>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <div className="w-full flex justify-between">
                <Button onClick={() => setIsOpenSecondDialog(false)}>
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          type="button"
          className="text"
          onClick={handleAddNewVersionClick}
          disabled={!formik.isValid || formik.isSubmitting} // اضافه کردن شرط
        >
          {locale == "fa" ? "افزودن نسخه جدید" : "Add new version"}
        </Button>
        <Button
          type="button"
          onClick={handleUpdateClick}
          className="text"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {locale == "fa" ? "آپدیت" : "Update"}
        </Button>
      </form>
    </section>
  );
};

export default EditQuestionForm;
