"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSchemaChangeAccountDetails } from "@/schema/validateSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";

const ChangeAccountDetails = ({ t }) => {
  const schemaValidate = validateSchemaChangeAccountDetails(t);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      password: "",
    },
    validationSchema: schemaValidate,
    onSubmit: async (data) => {
      const { name, lastName, password } = data;
      const res = await axios.post(
        "/api/auth/update-info",
        {
          name,
          lastName,
          password,
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
          <Label>{t.name}</Label>
          <Input
            type="text"
            name="name"
            className="border border-primary"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && (
            <p className="text-xs text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>{t.lastName}</Label>
          <Input
            type="text"
            name="lastName"
            className="border border-primary"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.lastName && (
            <p className="text-xs text-red-500">{formik.errors.lastName}</p>
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

export default ChangeAccountDetails;
