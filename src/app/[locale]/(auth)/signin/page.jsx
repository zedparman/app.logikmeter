import React from "react";
import { useMessages } from "next-intl";
import SignInComponent from "../../components/SignIn/SignInComponent";
import CheckAuthRedirect from "@/app/context/CheckAuthRedirect";

const SignInPage = () => {
  const t = useMessages("SignIn");

  return (
    <CheckAuthRedirect>
      <SignInComponent t={t.SignIn} />
    </CheckAuthRedirect>
  );
};

export default SignInPage;
