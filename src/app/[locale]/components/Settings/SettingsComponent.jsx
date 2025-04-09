import React from "react";
import ChangeAccountDetails from "./ChangeAccountDetails";
import { useMessages } from "next-intl";
import ChenagePassword from "./ChenagePassword";

const SettingsComponent = () => {
  const t = useMessages("Dashboard");
  return (
    <section className="space-y-5 xl:w-[60%]">
      <ChangeAccountDetails t={t.Dashboard.SettingsPage} />
      <ChenagePassword t={t.Dashboard.SettingsPage.ChenagePassword} />
    </section>
  );
};

export default SettingsComponent;
