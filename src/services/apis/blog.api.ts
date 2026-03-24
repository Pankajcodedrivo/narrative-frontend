import httpsCall from "../httpsCall";
import catchAsync from "../../utils/catchAsync";

export const getBlogs = catchAsync(async (page = 1, limit = 6) => {
  const res = await httpsCall.get(`/admin/blog/blog-list/${page}/${limit}`);
  return res.data;
});

export const addBlog = async (formData: FormData) => {
  const res = await httpsCall.post(`/admin/blog/add-blog`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
