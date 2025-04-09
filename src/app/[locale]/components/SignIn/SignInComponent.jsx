"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSchemaSignIn } from "@/schema/validateSchema";
import { useFormik } from "formik";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Link } from "@/navigations";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";

const SignInComponent = ({ t }) => {
  const schemaValidate = validateSchemaSignIn(t);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaValidate,
    onSubmit: async (data) => {
      const { email, password } = data;
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      // console.log(res);
      if (res.status !== 200) {
        // console.log(res);
        toast.error(res.response.data.message);
      } else {
        toast.success(t.successMessage);
        window.localStorage.setItem("em", email);
        router.push("/");
        router.refresh();
      }
    },
  });
  return (
    <div className="flex items-center justify-center flex-col p-5">
      <div className="flex items-center flex-col gap-5 border border-primary p-6 rounded-lg bg-card ">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p>{t.subTitle}</p>

        <form
          className="flex flex-col gap-5 w-full "
          onSubmit={formik.handleSubmit}
        >
          <div className="space-y-2">
            <Label>{t.email}</Label>
            <Input
              type="text"
              name="email"
              className="border border-primary"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t.password}</Label>
            <Input
              type="password"
              name="password"
              className="border border-primary"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <p className="flex gap-2 text-sm">
            {t.DontHaveAccount}
            <span className="text-primary">
              <Link href="/signup">{t.SignUp}</Link>
            </span>
          </p>
          <Button
            type="submit"
            className="text"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? (
              <PulseLoader color="#ffff" size={"5px"} />
            ) : (
              t.submit
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInComponent;
