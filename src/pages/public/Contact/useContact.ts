import { useState } from "react";
import { useFormik } from "formik";
import { contactSchema } from "../../../utils/validation/contact.schema";
import { sendContact } from "../../../services/apis/contact.api";

const useContact = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },

    validationSchema: contactSchema,

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      try {
        // 🔥 Transform data BEFORE sending to backend
        const payload = {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          message: values.message,
        };

        await sendContact(payload);

        resetForm();
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    formik,
    loading,
  };
};

export default useContact;
