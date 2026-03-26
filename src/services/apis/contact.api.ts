import httpsCall from "../httpsCall";

// export const sendContact = async (values:any) => {
//   const data = await httpsCall.post(`/admin/contact/public/contact`, values);
//   return data;
// };

export const sendContact = async (values: any) => {
  const res = await httpsCall.post(`/admin/contact/public/contact`, values);
  return res.data;
};
