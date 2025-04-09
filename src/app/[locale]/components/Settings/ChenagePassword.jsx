"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSchemaChangePassword } from "@/schema/validateSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";

const ChenagePassword = ({ t }) => {
  const schemaValidate = validateSchemaChangePassword(t);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confrimPassword: "",
    },
    validationSchema: schemaValidate,
    onSubmit: async (data) => {
      const { currentPassword, password } = data;
      const res = await axios.post(
        "/api/auth/change-password",
        {
          currentPassword,
          newPassword: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      if (res.status !== 200) {
        // console.log(res.response.data.message);
      }
      router.refresh();
    },
  });
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <form
        className="flex flex-col my-5 gap-5 w-full "
        onSubmit={formik.handleSubmit}
      >
        <div className="space-y-2">
          <Label>{t.currentPassword}</Label>
          <Input
            type="password"
            name="currentPassword"
            className="border border-primary"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.currentPassword && (
            <p className="text-xs text-red-500">
              {formik.errors.currentPassword}
            </p>
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
        <div className="space-y-2">
          <Label>{t.retypePassword}</Label>
          <Input
            type="password"
            name="confrimPassword"
            className="border border-primary"
            value={formik.values.confrimPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confrimPassword && (
            <p className="text-xs text-red-500">
              {formik.errors.confrimPassword}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="text"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t.submit}
        </Button>
      </form>
    </div>
  );
};

export default ChenagePassword;
