import CreateQuestionComponent from "@/app/[locale]/components/CreateQuestion/CreateQuestionComponent";
import { useMessages } from "next-intl";

export default function CreateQuestion(props) {
  const t = useMessages("Dashboard");
  return (
    <CreateQuestionComponent
      t={t.Dashboard.CreateQuestionPage}
      params={props.params}
    />
  );
}
