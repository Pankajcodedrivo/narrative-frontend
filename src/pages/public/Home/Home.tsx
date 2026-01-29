import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import banner from "../../../assets/images/banner.jpg";
import banImg from "../../../assets/images/banner-img.jpg";
import shape1 from "../../../assets/images/shape-1.png";
import shape2 from "../../../assets/images/shape-2.png";
import playBtn from "../../../assets/images/play-btn.svg";
import image1 from "../../../assets/images/image-1.jpg";
import image2 from "../../../assets/images/image-2.jpg";
import image3 from "../../../assets/images/image-3.jpg";
import aiImage1 from "../../../assets/images/ai-image-1.jpg";
import aiImage2 from "../../../assets/images/ai-image-2.jpg";
import aiImage3 from "../../../assets/images/ai-image-3.jpg";
import storyImage1 from "../../../assets/images/story-image-1.jpg";
import storyImage2 from "../../../assets/images/story-image-2.jpg";
import google from "../../../assets/images/google.png";
import "./home.scss";
import SubHeader from "../../../components/SubHeader/SubHeader";
import BenefitCard from "../../../components/Home/BenefitsFeatures/BenefitCard";
import FeatureCard from "../../../components/Home/Feature/FeatureCard";
import StoryCard from "../../../components/Home/Story/StoryCard";
import ReviewSlider from "../../../components/Home/Review/ReviewSlider";


const Home = () => {
  return (
    <>
      <Header />
      <section className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <div className="banner-content">
                <h1>Turn memories into a beautiful life story — <span> Powered by AI.</span></h1>
                <p>Capture personal stories through an interactive AI - guided interview and transform them into a timeless memorial video.</p>
                <button className="btn btn-secondary">Start Your Story</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="banner-img-wrapper">
                <div className="shape-2"><img src={shape2} alt="" /></div>
                <div className="ban-img">
                  <div className="shape-1"><img src={shape1} alt="" /></div>
                  <img className="image-area" src={banImg} alt="" />
                  <Link to="/" className="play-btn"><img src={playBtn} alt="" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="benefit-sec common-gap">
        <div className="container">
          <div className="text-center">
            <SubHeader title="Customer Value Proposition (Benefits & Features)" desc="A clear overview of the benefits and features designed to drive results." />
          </div>
          <div className="row">
            <div className="col-md-4">
              <BenefitCard
                image={image1}
                title="Life Story/Documentary"
                desc="Every life story has an opening, lets try an opening that provides the audience with an understanding of who you are as a person. I will start by asking a series of questions about you to help craft your opening."
              />
            </div>
            <div className="col-md-4">
              <BenefitCard
                image={image2}
                title="Life Story/Documentary"
                desc="The next series of questions will provide the audience with a glimpse of you childhood personality."
              />
            </div>
            <div className="col-md-4">
              <BenefitCard
                image={image3}
                title="Life Story/Documentary"
                desc="As one transitions into early adulthood they are often establishing and managing key relationships with friends, family, love interests, etc. that influence their approach to building and maintaining relationships."
              />
            </div>
          </div>
        </div>
      </section>
      <section className="plans-sec common-gap">
        <div className="container">
          <div className="text-center">
            <SubHeader title="Membership Plans" desc="Simple, flexible plans designed to help you turn life’s moments into beautifully crafted stories." />
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="plans-card">
                <h2>₹499<span>/month</span></h2>
                <h3>Basic Plan – <span>Starter Story</span></h3>
                <p>Ideal for first-time users.</p>
                <ul className="cmn-list">
                  <li>1 Life Story / Documentary</li>
                  <li>Up to 30 minutes final video</li>
                  <li>Guided AI interview</li>
                  <li>Upload photos, videos & audio</li>
                  <li>Smart scene stitching</li>
                  <li>Standard video export (HD)</li>
                  <li>Email support</li>
                </ul>
                <button type="button" className="btn btn-outline">Start Your Story</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plans-card">
                <span className="plans-tag">Most Popular</span>
                <h2>₹1,299<span>/month</span></h2>
                <h3>Basic Plan – <span> Most Popular</span></h3>
                <p>For families & meaningful storytelling.</p>
                <ul className="cmn-list">
                  <li>Up to 5 Life Stories</li>
                  <li>90 minutes final video per story</li>
                  <li>Invite guest participants</li>
                  <li>Advanced AI storytelling & narration</li>
                  <li>Professional-grade editing polish</li>
                  <li>Multiple video formats</li>
                  <li>Priority support</li>
                </ul>
                <button type="button" className="btn btn-primary">Create Premium Story</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plans-card">
                <h2>₹3,999<span>/month</span></h2>
                <h3>Basic Plan – <span> Professional</span></h3>
                <p>For creators, filmmakers & agencies</p>
                <ul className="cmn-list">
                  <li>Unlimited Stories</li>
                  <li>Unlimited video duration</li>
                  <li>Brand customization</li>
                  <li>Commercial usage rights</li>
                  <li>Collaborative workspace</li>
                  <li>Dedicated account support</li>
                  <li>Early access to new AI features</li>
                </ul>
                <button type="button" className="btn btn-outline">Start Studio Access</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="common-gap">
        <div className="container">
          <div className="cmn-top">
            <SubHeader title="AI powered video creation" desc="Your words and memories become a heartfelt video, carefully crafted by AI to reflect your journey with clarity and emotion. Our intelligent AI crafts meaningful videos from your content, ensuring every moment feels alive and beautifully curated." />
            <button type="button" className="btn btn-secondary">Invite Someone to Participate</button>
          </div>
          <div className="feature-otr">
              <div className="row feature-row">
                <div className="col-md-4 feature-col">
                  <FeatureCard
                  image={aiImage1}
                  title="Upload Your Visuals"
                  desc="Add your photos, clips or event videos - the system will intelligently match them to your story."
                  />
                </div>
                <div className="col-md-4 feature-col">
                  <FeatureCard
                  image={aiImage2}
                  title="Smart Scene Matching"
                  desc="The AI: Prioritizes your uploaded visuals. Adds AI-generated clips where needed."
                  />
                </div>
                <div className="col-md-4 feature-col">
                  <FeatureCard
                  image={aiImage3}
                  title="Smooth Professional Editing"
                  desc="Every scene flows naturally with enhanced clarity, balance, and professional finishing touches."
                  />
                </div>
              </div>
          </div>
        </div>
      </section>
      <section className="start-today common-gap">
        <div className="container">
          <div className="text-center">
            <SubHeader title="Start your story today!" desc="Your memories deserve more than storage - they deserve storytelling." />
            <div className="button-group">
                <button className="btn btn-primary">Start Interview</button>
                <button className="btn btn-outline">See Example Stories</button>
            </div>
          </div>
        </div>
      </section>
      <section className="common-gap">
        <div className="container">
          <div className="text-center">
            <SubHeader title="Immersive Audio experience & the final magic" desc="AI enhances your audio, selects the perfect background music, and applies the final touches that bring your story to life." />
          </div>
          <div className="story-wrapper">
            <StoryCard
              image={storyImage1}
              title="Immersive Audio Experience"
            >
              <ul className="cmn-list">
                  <li>AI selects background music from royalty-free libraries.</li>
                  <li>Matches tone, mood and intensity of your narrative.</li>
                  <li>Ensures your audio, video and photos remains clear and central.</li>
              </ul>
            </StoryCard>
            <StoryCard
              image={storyImage2}
              title="The Final Magic"
            >
              <ul className="cmn-list mb-3">
                  <li>Renders your full story video.</li>
                  <li>Sends you a notification when complete.</li>
                  <li>Invites you to share feedback through a user survey.</li>
              </ul>
              <p>Your journey becomes a cinematic experience.</p>
            </StoryCard>
          </div>
        </div>
      </section>
      <section className="common-gap back">
        <div className="container">
          <div className="cmn-top">
            <SubHeader title="Stories from our users." desc="Hear how people are preserving memories and turning moments into lasting stories." />
            <span><img src={google} alt="" /></span>
          </div>
          <ReviewSlider />
        </div>
      </section>
    </>
  );
};

export default Home;
