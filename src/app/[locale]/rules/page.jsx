import React from "react";
import { useMessages } from "next-intl";
const RulesPage = () => {
  const t = useMessages();
  return (
    <section className="bg-card flex flex-col gap-6 p-2">
      <h1 className="text-primary">{t.rules.title}</h1>
      <div>
        <h2>{t.rules.TCap_1}</h2>
        <p>{t.rules.subC_1}</p>
      </div>
      <div>
        <h2>{t.rules.TCap_2}</h2>
        <p>{t.rules.subC_2}</p>
      </div>
      <div>
        <h2>{t.rules.TCap_3}</h2>
        <p>{t.rules.subC_3}</p>
      </div>
      <div>
        <h2>{t.rules.TCap_4}</h2>
        <p>{t.rules.subC_4}</p>
      </div>
      <div>
        <h2>{t.rules.TCap_5}</h2>
        <p>{t.rules.subC_5}</p>
      </div>
    </section>
  );
};

export default RulesPage;
