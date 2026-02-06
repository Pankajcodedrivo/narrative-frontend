import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

type LoginData = {
  email: string;
  password: string;
};

type ForgotPaawordData = {
  email: string;
};

type ResetPasswordData = {
  password: string;
  cpassword: string;
};

type changePasswordData = {
  password_old: string;
  password_new: string;
};

type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
};

export const logInApi = catchAsync(async (values: LoginData) => {
  try {
    const data = await httpsCall.post(`/auth/login`, values);
    return data;
  } catch (error) {
    throw error;
  }
});

export const registrationApi = catchAsync(async (values: RegistrationData) => {
  try {
    const data = await httpsCall.post(`/auth/register`, values);
    return data;
  } catch (error) {
    throw error;
  }
});

export const forgotPasswordApi = catchAsync(
  async (values: ForgotPaawordData) => {
    const data = await httpsCall.post(`/auth/forgot-password`, values);
    return data;
  }
);

export const verifySecurityCodeApi = catchAsync(
  async (values: ForgotPaawordData) => {
    const data = await httpsCall.post(`/auth/verify-otp`, values);
    return data;
  }
);

export const resetPasswordApi = catchAsync(
  async (values: ResetPasswordData) => {
    const data = await httpsCall.patch(`/auth/reset-password`, values);
    return data;
  }
);

export const changePasswordApi = catchAsync(
  async (values: changePasswordData) => {
    const data = await httpsCall.patch(
      `/auth/profile/change-password`,
      values
    );
    return data;
  }
);

export const dashboardApi = catchAsync(async (values: any) => {
  const data = await httpsCall.get(`/auth/dashboard/get`, values);
  return data;
});
