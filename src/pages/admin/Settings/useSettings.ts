import { useFormik } from "formik";
import * as yup from "yup";
import { changePasswordApi } from "../../../../services/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { oldPasswordSchema, newPasswordSchema, confirmPasswordSchema } from "../../../../utils/yupSchemas";

// Define the shape of the form values
interface ResetPasswordFormValues {
    password_old: string;
    password_new: string;
    cpassword: string;
}
export const useSettings = () => {
  const navigate = useNavigate();
  const changePasswordFormik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      password_old: "",
      password_new: "",
      cpassword: "",
    },
    validationSchema: yup.object({
        password_old: oldPasswordSchema,
        password_new: newPasswordSchema,
        cpassword: confirmPasswordSchema,
    }),
    onSubmit: async (values) => {
      const bodyData = {
        password_old: values.password_old,
        password_new: values.password_new,
      };
      try {
        await changePasswordApi(bodyData);
        localStorage.removeItem("token");
        sessionStorage.clear();
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    changePasswordFormik,
  };
};
