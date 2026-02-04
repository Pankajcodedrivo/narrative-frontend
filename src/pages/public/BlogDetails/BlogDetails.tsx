import blogdetailImg from "../../../assets/images/blog-detail-pic.jpg";
import ReviewSection from "../../../components/Review/ReviewSection";
import "./BlogDetails.scss";
const BlogDetails = () => {
    return (
        <>
            <section className="common-gap">
                <div className="container">
                    <div className="inner-hdr text-center mb-4">
                        <h1 className="mb-0"><span> Creative Ideas for Personal Videos You’ll</span> Cherish Forever.</h1>
                    </div>
                    <figure className="img-wrapper"><img src={blogdetailImg} alt="" /></figure>
                    <div className="detail-wrapper">
                        <p>Personal videos are more than just collections of photos and clips—they are powerful storytelling tools that help you relive emotions, preserve memories, and share meaningful moments with the people you care about. Whether you’re celebrating a special occasion or reflecting on life’s journey, here are some creative ideas to inspire your next personal video.</p>
                        <h3>Birthday Time Capsules</h3>
                        <p>Create a birthday video that captures messages from family and friends, photos from past years, and highlights of memorable moments. Add voice notes or written wishes to make the video feel personal and heartfelt. This type of video becomes more meaningful with time and can be revisited year after year.</p>
                        <h3>Life Milestone Stories</h3>
                        <p>Celebrate milestones such as graduations, weddings, new jobs, or retirements by documenting the journey leading up to the moment. Combine old photos, short video clips, and a simple narrative to tell the story of growth, challenges, and achievements.</p>
                        <p>Turn your family photos and home videos into a beautifully structured story. Organize the content by years, events, or themes, and add background music to create an emotional and engaging experience that can be shared across generations.</p>
                        <p>Record a personal message to your future self reflecting on your current dreams, thoughts, and experiences. This type of video is deeply personal and becomes a powerful reminder of how far you’ve come when watched years later. Relive your favorite trips by creating a travel video that includes photos, short clips, and brief captions describing each destination. Add ambient music and transitions to recreate the feeling of being there again. Create a tribute video to express gratitude or honor someone special—such as parents, mentors, or friends. Include meaningful moments, shared memories, and a heartfelt message to make it truly memorable.</p>
                        <p>Document a child’s growth by compiling photos and videos from different stages of life. Add simple captions or voiceovers to highlight milestones and special moments that parents and families will cherish forever. Share your personal journey, challenges, lessons learned, and achievements. These videos can serve as motivation for yourself or inspiration for others, making them powerful storytelling tools.</p>
                        <button type="button" className="btn btn-secondary mw-100">Contact Us</button>
                    </div>
                </div>
            </section>
            <ReviewSection />
        </>
    );
};

export default BlogDetails;
