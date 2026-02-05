import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

// update account 
export const saveSupport = catchAsync(async (values) => {
  const data = await httpsCall.post(`/lead/support/create-support-request`, values);
  return data;
});