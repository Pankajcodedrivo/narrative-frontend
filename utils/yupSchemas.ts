import * as yup from "yup";
import { VALIDATION_MESSAGES } from "./validationMessages";

// Login validation
export const emailSchema = yup
  .string()
  .email(VALIDATION_MESSAGES.EMAIL_INVALID)
  .required(VALIDATION_MESSAGES.EMAIL_REQUIRED);

export const oldPasswordSchema = yup
  .string()
  .trim()
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
  .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
  .required(VALIDATION_MESSAGES.OLD_PASSWORD_REQUIRED);

export const newPasswordSchema = yup
  .string()
  .trim()
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
  .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
  .required(VALIDATION_MESSAGES.NEW_PASSWORD_REQUIRED);

export const passwordSchema = yup
  .string()
  .trim()
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
  .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
  .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED);

// Confirm password validation
export const confirmPasswordSchema = yup
  .string()
  .trim()
  .required(VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
  .when("password_new", {
    is: (password_new: string) => !!password_new,
    then: (schema) =>
      schema
        .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
        .matches(/\w/, VALIDATION_MESSAGES.PASSWORD_INVALID)
        .oneOf([yup.ref("password_new")], VALIDATION_MESSAGES.PASSWORD_MATCH),
  });

// My account validation
export const fnameSchema = yup
  .string()
  .required(VALIDATION_MESSAGES.FIRST_NAME);

export const lnameSchema = yup
  .string()
  .required(VALIDATION_MESSAGES.LAST_NAME);
