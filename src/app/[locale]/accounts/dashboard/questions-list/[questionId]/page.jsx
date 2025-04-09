import EditQuestionComponent from "@/app/[locale]/components/CreateQuestion/EditQuestionComponent";
import { useMessages } from "next-intl";

export default function EditQuestion(props) {
  const t = useMessages("Dashboard");
  return (
    <EditQuestionComponent
      t={t.Dashboard.CreateQuestionPage}
      params={props.params}
    />
  );
}
