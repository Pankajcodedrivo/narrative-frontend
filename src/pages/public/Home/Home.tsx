import { Link } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import { useEffect } from "react";
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
import circle from "../../../assets/images/circle.png";
import curve2 from "../../../assets/images/curve-2.png";
import curveMobile from "../../../assets/images/curve-mobile.png";
import img1 from "../../../assets/images/img1.jpg";
import img2 from "../../../assets/images/img2.jpg";
import leftCurve from "../../../assets/images/left-curve.png";
import rightCurve from "../../../assets/images/right-curve.png";
import shape3 from "../../../assets/images/shape-3.png";
import "./home.scss";
import SubHeader from "../../../components/SubHeader/SubHeader";
import BenefitCard from "../../../components/Home/BenefitsFeatures/BenefitCard";
import FeatureCard from "../../../components/Home/Feature/FeatureCard";
import StoryCard from "../../../components/Home/Story/StoryCard";
import ReviewSection from "../../../components/Review/ReviewSection";


const Home = () => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
      return () => Fancybox.destroy();
    }, []);
  return (
    <>
      <section className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <div className="banner-content">
                <h1>Turn memories into a beautiful life story — <span> Powered by AI.</span></h1>
                <p>Capture personal stories through an interactive AI - guided interview and transform them into a timeless memorial video.</p>
                <button className="btn btn-secondary mw-100">Start Your Story</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="banner-img-wrapper">
                <div className="shape-2"><img src={shape2} alt="" /></div>
                <div className="ban-img">
                  <div className="shape-1"><img src={shape1} alt="" /></div>
                  <img className="image-area" src={banImg} alt="" />
                  <a href="https://youtu.be/zGRPON4FcBk?si=_BuCMvCJ1YEOvcq2" className="play-btn" data-fancybox><img src={playBtn} alt="" /></a>
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
          <div className="row g-4">
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
          <div className="row g-4">
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
                <button type="button" className="btn btn-outline mw-100">Start Your Story</button>
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
                <button type="button" className="btn btn-primary mw-100">Create Premium Story</button>
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
                <button type="button" className="btn btn-outline mw-100">Start Studio Access</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works-sec common-gap">
        <div className="container">
          <div className="how-it-works-hdr">
            <SubHeader title="How it works?" desc="A guided, step-by-step journey that helps you record your memories and transform them into a beautifully crafted story— making it easy to preserve moments, emotions, and experiences in a meaningful way." />
          </div>
          <div className="how-it-wrapper">
            <div className="curve-2"><img src={curve2} alt="" /></div>
            <div className="curve-mobile"><img src={curveMobile} alt="" /></div>
              <div className="row">
                <div className="col-md-4 how-it-works-otr">
                  <div className="how-it-works-innr">
                    <div className="how-it-works-left">
                      <span className="dot"><span></span></span>
                      <h3 className="mb-3">Guided AI Interview</h3>
                      <ul className="cmn-list mb-32">
                        <li>A friendly virtual assistant introduces itself.</li>
                        <li>Gives tips for lighting, sound and framing.</li>
                        <li>Asks carefully crafted interview questions.</li>
                        <li>Helps with guidance + optional sample answers.</li>
                      </ul>
                      <button type="button" className="btn btn-outline mw-100">Begin Interview</button>
                    </div>
                    <span className="number">1</span>
                  </div>
                </div>
                <div className="col-md-4 how-it-works-otr">
                  <div className="how-it-works-innr">
                    <div className="how-it-works-left">
                      <span className="dot"><span></span></span>
                      <h3 className="mb-3">Invite Guest Participants</h3>
                      <ul className="cmn-list mb-32">
                        <li>Invite friends, family, colleagues or mentors.</li>
                        <li>They receive a personalized interview link.</li>
                        <li>Option for guests to create their own profile after finishing.</li>
                      </ul>
                      <button type="button" className="btn btn-primary mw-100">Invite Someone to Participate</button>
                    </div>
                    <span className="number">2</span>
                  </div>
                </div>
                <div className="col-md-4 how-it-works-otr">
                  <div className="how-it-works-innr">
                    <div className="how-it-works-left">
                      <span className="dot"><span></span></span>
                      <h3 className="mb-3">Guided AI Interview</h3>
                      <ul className="cmn-list mb-32">
                        <li>Optimizes content for 8-10 minutes per/scene.</li>
                        <li>Group responses by topic.</li>
                        <li>Prioritizes emotional depth, character development & personal insights.</li>
                        <li>Removes incomplete or repetitive answers.</li>
                      </ul>
                      <button type="button" className="btn btn-outline mw-100">Get Started</button>
                    </div>
                    <span className="number">3</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="circle"><img src={circle} alt="" /></div>
      </section>
      <section className="platform-sec common-gap">
        <div className="container">
          <div className="text-center">
            <SubHeader title="Why this Platform?" desc="We merge advanced AI technology with thoughtful design to ensure your memories are captured authentically and transformed into a polished, heartfelt tribute." />
          </div>
          <div className="row align-items-end g-5">
              <div className="col-lg-4">
                  <div className="image-1 scale">
                      <img className="img-cover" src={img1} alt="" />
                  </div>
              </div>
              <div className="col-lg-5 col-md-6 pb-46">
                  <ul className="mb-32 platform-list">
                      <li>Professional-quality storytelling without editors.</li>
                      <li>AI-guided interview for natural responses.</li>
                      <li>Add your own audio, videos and photos to create your own story. </li>
                      <li>Smart content organization & deep narrative structure.</li>
                      <li>Visually stunning, emotionally rich final output.</li>
                      <li>Fast, automated editing pipeline.</li>
                  </ul>
                  <button type="button" className="btn btn-primary mw-100">Start Your Story</button>
              </div>
              <div className="col-lg-3 col-md-6">
                  <div className="image-2 scale">
                      <img className="img-cover" src={img2} alt="" />
                  </div>
              </div>
          </div>
        </div>
        <div className="left-curve"><img src={leftCurve} alt="" /></div>
        <div className="right-curve"><img src={rightCurve} alt="" /></div>
        <div className="shape-3"><img src={shape3} alt="" /></div>
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
      <ReviewSection />
    </>
  );
};

export default Home;
