import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { emailSchema, passwordSchema } from "../../../utils/yupSchemas";
import { logInApi } from "../../../services/apis/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.store";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: emailSchema,
      password: passwordSchema,
    }),
onSubmit: async (values) => {
  setLoading(true);
  try {
    const bodyData = {
      email: values.email,
      password: values.password,
    };

    const response = await logInApi(bodyData);
    const user = response?.data?.user;
    const tokens = response?.data?.tokens;

    if (!user || !tokens?.access || !tokens?.refresh) {
      throw new Error("Login response is missing user or tokens.");
    }

    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    if (user?.role == 'user') {
      navigate("/dashboard", { replace: true });
    }

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
},
  });
  return {
    loginFormik,
    loading,
  };
};
