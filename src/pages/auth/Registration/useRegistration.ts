import { useFormik } from "formik";
import * as yup from "yup";
import { registrationApi } from "../../../../services/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { fnameSchema, lnameSchema, emailSchema, confirmPasswordSchema, passwordSchema } from "../../../../utils/yupSchemas";

// Define the shape of the form values
interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cpassword: string;
    terms: boolean;
}

export const useRegistration = () => {
  const navigate = useNavigate();
  const registrationFormik = useFormik<RegistrationFormValues>({
    initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cpassword: "",
        terms: false, 
    },
    validationSchema: yup.object({
        firstName: fnameSchema,
        lastName: lnameSchema,
        email: emailSchema,
        password: passwordSchema,
        cpassword: confirmPasswordSchema,
        terms: yup
        .boolean()
        .oneOf([true], "You must accept Terms & Conditions"),
    }),
    onSubmit: async (values) => {
      const bodyData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      try {
        await registrationApi(bodyData);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    registrationFormik,
  };
};
