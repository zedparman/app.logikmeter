import QuestionsPageComponent from "../components/Questions/QuestionsPageComponent";
import { useMessages } from "next-intl";

export default function QuestionsPage() {
  const t = useMessages("SignIn");
  return <QuestionsPageComponent t={t.QuestionsPageCom} cop={true} />;
}
