import BlogCard from "../../../components/BlogCard/BlogCard";
import InnerBanner from "../../../components/InnerBanner/InnerBanner";
import ReviewSection from "../../../components/Review/ReviewSection";
import SubHeader from "../../../components/SubHeader/SubHeader";
import blog1 from "../../../assets/images/blog-1.jpg";
import blog2 from "../../../assets/images/blog-2.jpg";
import "./Blog.scss";
const Blog = () => {
  return (
    <>
        <InnerBanner />
        <section className="common-gap">
            <div className="container">
                <div className="text-center">
                    <SubHeader title="Blog" desc="Insights, guides, and updates on creating, managing, and sharing personal videos." />
                </div>
                <div className="blog-wrapper">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <BlogCard image={blog1} title="Turning Memories into Stories: How to Create Your First Personal Video" desc="Learn step-by-step how to transform your photos and moments into a meaningful personal video that lasts forever." />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <BlogCard image={blog2} title="Creative Ideas for Personal Videos You’ll Cherish Forever" desc="From birthdays to life milestones, discover creative ways to tell your story through personalized videos." />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <BlogCard image={blog1} title="Choosing the Right Photos and Videos for a Perfect Story" desc="Tips on selecting the best visuals to enhance storytelling and create emotionally engaging videos." />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <BlogCard image={blog1} title="How AI Enhances Your Personal Video Experience" desc="Explore how smart features like auto-editing, voiceovers, and scene suggestions make video creation effortless." />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <BlogCard image={blog1} title="Personal Videos vs Traditional Albums: Which Is Better?" desc="Understand the benefits of personal videos compared to photo albums and why digital storytelling matters." />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <BlogCard image={blog1} title="Best Practices for Writing a Compelling Video Script." desc="Learn how to structure your story, add emotion, and keep viewers engaged from start to finish." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <ReviewSection />
    </>
  );
};

export default Blog;
