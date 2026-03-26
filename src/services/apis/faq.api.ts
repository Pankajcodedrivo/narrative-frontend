// import httpsCall from "../httpsCall";

// // export const getFaqs = catchAsync(async (page = 1, limit = 10) => {
// //   const data = await httpsCall.get(
// //     `/admin/faq/public/faq-list/${page}/${limit}`,
// //   );
// //   return data;
// // });

// export const getFaqs = async (page = 1, limit = 10, search = "") => {
//   const res = await httpsCall.get(
//     `/faq?page=${page}&limit=${limit}&search=${search}`,
//   );
//   return res.data;
// };

// export const getFaqDetail = async (id: string) => {
//   const res = await httpsCall.get(`/faq/${id}`);
//   return res.data;
// };

import httpsCall from "../httpsCall";

export const getFaqs = async (page = 1, limit = 10, search = "") => {
  const res = await httpsCall.get(
    `/faq?page=${page}&limit=${limit}&search=${search}`,
  );
  return res.data;
};

export const getFaqDetail = async (id: string) => {
  const res = await httpsCall.get(`/faq/${id}`);
  return res.data;
};
