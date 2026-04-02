import BlogCard from "../../../components/BlogCard/BlogCard";
import InnerBanner from "../../../components/InnerBanner/InnerBanner";
import ReviewSection from "../../../components/Review/ReviewSection";
import SubHeader from "../../../components/SubHeader/SubHeader";
import "./Blog.scss";
import { useNavigate } from "react-router-dom";
import useBlogs from "./useBlogs";

const Blog = () => {
  const navigate = useNavigate();
  const {
    filteredBlogs,
    categoryOptions,
    selectedCategories,
    loading,
    page,
    totalPages,
    setPage,
    setSelectedCategories,
    toggleCategory,
  } = useBlogs();

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

          <div className="blog-filter-row">
            <div className="blog-filter-card">
              <div className="blog-filter-head">
                <h4>Blog Categories</h4>
                {!!selectedCategories.length && (
                  <button
                    type="button"
                    className="blog-filter-clear"
                    onClick={() => setSelectedCategories([])}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="blog-filter-options">
                {categoryOptions.map((category) => (
                  <label key={category} className="blog-filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="blog-wrapper">
            <div className="row g-4">
              {filteredBlogs.map((blog, index) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={blog._id || index}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                >
                  <BlogCard
                    image={blog.featuredImage || ""}
                    title={blog.title || ""}
                    desc={blog.excerpt || ""}
                  />
                </div>
              ))}
            </div>

            {!loading && !filteredBlogs.length && (
              <div className="blog-empty-state">
                No blogs found for the selected category.
              </div>
            )}

            {totalPages > 1 && (
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
            )}
          </div>
        </div>
      </section>

      <ReviewSection />
    </>
  );
};

export default Blog;
