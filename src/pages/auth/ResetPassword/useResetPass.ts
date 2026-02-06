import { useFormik } from "formik";
import * as yup from "yup";
import { resetPasswordApi } from "../../../../services/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { confirmPasswordSchema, passwordSchema } from "../../../../utils/yupSchemas";

// Define the shape of the form values
interface ResetPasswordFormValues {
  password: string;
  cpassword: string;
}

export const useResetPass = (email: string | null) => {
  const navigate = useNavigate();
  const resetPasswordFormik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: yup.object({
      password: passwordSchema,
      cpassword: confirmPasswordSchema,
    }),
    onSubmit: async (values) => {
      const bodyData = {
        email: email,
        password: values.password,
      };
      try {
        await resetPasswordApi(bodyData);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    resetPasswordFormik,
  };
};
