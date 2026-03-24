import httpsCall from "../httpsCall";

export const getBlogs = async (page = 1, limit = 6) => {
  const res = await httpsCall.get(`/admin/blog/blog-list/${page}/${limit}`);
  return res.data;
};

export const addBlog = async (formData: FormData) => {
  const res = await httpsCall.post(`/admin/blog/add-blog`, formData);
  return res.data;
};

export const getBlogDetails = async (slug: string) => {
  const res = await httpsCall.get(`/admin/blog/blog-detail/${slug}`);
  return res.data;
};
