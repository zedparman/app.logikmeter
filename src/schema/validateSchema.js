import * as yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const validateSchemaSignUp = (t) => {
  const signUpFormSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, t.userNameValidateLong)
      .required(t.userNameRequire),
    lastName: yup
      .string()
      .min(3, t.lastNameValidateLong)
      .required(t.lastNameRequire),
    email: yup.string().email(t.emailValidate).required(t.emailRequire),
    password: yup
      .string()
      .matches(passwordRules, {
        message: t.passRules,
      })
      .min(8, t.passwordvalidate)
      .required(t.passwordRequire),
    confrimPassword: yup
      .string()
      .oneOf([yup.ref("password")], t.passMatch)
      .required(t.confrimPasswordRequire),
  });
  return signUpFormSchema;
};
const validateSchemaChangeAccountDetails = (t) => {
  const signUpFormSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, t.userNameValidateLong)
      .required(t.userNameRequire),
    lastName: yup
      .string()
      .min(3, t.lastNameValidateLong)
      .required(t.lastNameRequire),
    password: yup
      .string()
      .min(8, t.passwordvalidate)
      .required(t.passwordRequire),
  });
  return signUpFormSchema;
};
const validateSchemaCreateQuestion = (t) => {
  const signUpFormSchema = yup.object().shape({
    inpTitle: yup
      .string()
      .min(3, t.inpTitleValidateLong)
      .required(t.inpTitleRequire),
    inpSubTitle: yup.string().min(3, t.inpSubValidateLong),
    aboutQuestion: yup.string(),
    questionSummary: yup.string(),
  });
  return signUpFormSchema;
};
const validateSchemaChangePassword = (t) => {
  const signUpFormSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .matches(passwordRules, {
        message: t.passRules,
      })
      .min(8, t.passwordvalidate)
      .required(t.passwordRequire),
    password: yup
      .string()
      .matches(passwordRules, {
        message: t.passRules,
      })
      .min(8, t.passwordvalidate)
      .required(t.passwordRequire),
    confrimPassword: yup
      .string()
      .oneOf([yup.ref("password")], t.passMatch)
      .required(t.confrimPasswordRequire),
  });
  return signUpFormSchema;
};
const validateSchemaSignIn = (t) => {
  const signUpFormSchema = yup.object().shape({
    email: yup.string().email(t.emailValidate).required(t.emailRequire),
    password: yup
      .string()
      .matches(passwordRules, {
        message: t.passRules,
      })
      .min(8, t.passwordvalidate)
      .required(t.passwordRequire),
  });
  return signUpFormSchema;
};

export {
  validateSchemaSignUp,
  validateSchemaSignIn,
  validateSchemaChangeAccountDetails,
  validateSchemaChangePassword,
  validateSchemaCreateQuestion,
};
