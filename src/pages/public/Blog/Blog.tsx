import { useEffect, useState } from "react";
import BlogCard from "../../../components/BlogCard/BlogCard";
import InnerBanner from "../../../components/InnerBanner/InnerBanner";
import ReviewSection from "../../../components/Review/ReviewSection";
import SubHeader from "../../../components/SubHeader/SubHeader";
import { getBlogs } from "../../../services/apis/blog.api";
import "./Blog.scss";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async (currentPage: number) => {
    setLoading(true);
    try {
      const data = await getBlogs(currentPage, 6);
      console.log(data);

      // setBlogs(data.blogData.Blogs);
      // setTotalPages(data.blogData.totalPages);
      setBlogs(data.result.blogs);
      setTotalPages(data.result.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <>
      <InnerBanner />

      <section className="common-gap">
        <div className="container">
          <div className="text-center">
            <SubHeader
              title="Blog"
              desc="Insights, guides, and updates on creating, managing, and sharing personal videos."
            />
          </div>

          <div className="blog-wrapper">
            <div className="row g-4">
              {blogs.map((blog, index) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={blog._id || index}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                >
                  <BlogCard
                    image={blog.featuredImage}
                    title={blog.title}
                    desc={blog.excerpt}
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn btn-secondary me-2"
              >
                Prev
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-secondary ms-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      <ReviewSection />
    </>
  );
};

export default Blog;
