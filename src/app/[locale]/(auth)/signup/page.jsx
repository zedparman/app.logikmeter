import { useMessages } from "next-intl";
import SignUpComponent from "../../components/SignUp/SignUpComponent";
import CheckAuthRedirect from "@/app/context/CheckAuthRedirect";

const SignUpPage = ({ params: { locale } }) => {
  const t = useMessages("SignUp");

  return (
    <CheckAuthRedirect>
      <SignUpComponent
        t={t.SignUp}
        locale={locale}
        seKey={process.env.CAPTCHA_SECRET_KEY}
        siKey={process.env.CAPTCHA_SITE_KEY}
      />
    </CheckAuthRedirect>
  );
};

export default SignUpPage;
