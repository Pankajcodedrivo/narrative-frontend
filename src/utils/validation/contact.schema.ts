import * as Yup from "yup";

// this is validation for sending message
export const contactSchema = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string(),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
