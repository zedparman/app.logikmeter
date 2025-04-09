import { useMessages } from "next-intl";
import DashboardNav from "../../components/Nav/DashboardNav";
import GetAccess from "@/app/context/GetAccess";

export default function DashboardLayout({ children , session }) {
  const t = useMessages();

  return (
    <GetAccess>
      <div className="flex flex-col space-y-6 mt-10 ">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav t={t} />
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </GetAccess>
  );
}
