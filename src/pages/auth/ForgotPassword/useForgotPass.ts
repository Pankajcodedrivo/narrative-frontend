import { useFormik } from "formik";
import * as yup from "yup";
import { forgotPasswordApi } from "../../../../services/apis/auth.api";
import { useNavigate } from "react-router-dom";

export const useForgotPass = () => {
  const navigate = useNavigate();
  const forgotPassFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    }),
    onSubmit: async (values) => {
        await forgotPasswordApi(values);
        localStorage.setItem("email", values.email);
        navigate("/verify-otp");
    },
  });
  return {
    forgotPassFormik,
  };
};
