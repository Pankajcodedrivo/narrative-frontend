// import httpsCall from "../httpsCall";

// // export const getBlogs = async (page = 1, limit = 6) => {
// //   const res = await httpsCall.get(`/admin/blog/blog-list/${page}/${limit}`);
// //   return res.data;
// // };

// // export const getBlogDetails = async (slug: string) => {
// //   const res = await httpsCall.get(`/admin/blog/blog-detail/${slug}`);
// //   return res.data;
// // };

// export const getBlogs = async (page = 1, limit = 6, search = "") => {
//   const res = await httpsCall.get(
//     `/blog?page=${page}&limit=${limit}&search=${search}`,
//   );
//   return res.data;
// };

// export const getBlogDetails = async (slug: string) => {
//   const res = await httpsCall.get(`/blog/${slug}`);
//   return res.data;
// };

import httpsCall from "../httpsCall";

export const getBlogs = async (page = 1, limit = 6, search = "") => {
  const res = await httpsCall.get(
    `/blog?page=${page}&limit=${limit}&search=${search}`,
  );
  return res.data;
};

export const getBlogDetails = async (slug: string) => {
  const res = await httpsCall.get(`/blog/${slug}`);
  return res.data;
};
