import httpsCall from "../httpsCall";
import catchAsync from "../../utils/catchAsync";

export const getFaqs = catchAsync(async (page = 1, limit = 10) => {
  const data = await httpsCall.get(
    `/admin/faq/public/faq-list/${page}/${limit}`,
  );
  return data;
});
