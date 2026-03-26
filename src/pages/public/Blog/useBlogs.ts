import { useEffect, useState } from "react";
import { getBlogs } from "../../../services/apis/blog.api";

const useBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await getBlogs(currentPage, 6);
      setBlogs(res.blogs);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return {
    blogs,
    loading,
    page,
    totalPages,
    setPage,
  };
};

export default useBlogs;

// import { useEffect, useState } from "react";
// import { getBlogs } from "../../../services/apis/blog.api";

// const useBlogs = () => {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchBlogs = async (currentPage: number) => {
//     setLoading(true);
//     try {
//       const res = await getBlogs(currentPage, 6);
//       setBlogs(res.blogData.Blogs);
//       setTotalPages(res.blogData.totalPages);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs(page);
//   }, [page]);

//   return {
//     blogs,
//     loading,
//     page,
//     totalPages,
//     setPage,
//   };
// };

// export default useBlogs;
