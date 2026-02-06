import { forgotPasswordApi } from "../../../../services/apis/auth.api";

export const useResendCode = () => {
  const resendCode = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      throw new Error("Email not found");
    }
    await forgotPasswordApi({ email });
  };
  return { resendCode };
};
