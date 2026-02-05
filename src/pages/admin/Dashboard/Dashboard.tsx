import videoPic from "../../../assets/images/video-pic.jpg"
import playBtn from "../../../assets/images/play-btn.svg";
import tick from "../../../assets/images/tick.png"
import "./Dashboard.scss";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
const Dashboard = () => {
  return (
    <>
      <WelcomeHeader desc="All your recorded and upcoming interviews in one place." />
      <div className="video-innr mb-4">
          <figure className="video-pic mb-0">
            <img className="image-area" src={videoPic} alt="" />
            <a href="https://youtu.be/zGRPON4FcBk?si=_BuCMvCJ1YEOvcq2" className="play-btn" data-fancybox><img src={playBtn} alt="" /></a>
          </figure>
          <div className="inner-hdr mb-0">
              <h1 className="mb-0"><span>Turn memories into a beautiful life story</span> — Powered by AI.</h1>
          </div>
      </div>  
      <div className="tips-box">
          <div className="mb-4">
            <h3>Tips & Recommendations</h3>
            <p>Helpful guidance to shape your personal stories into meaningful videos that capture emotions and lasting memories.</p>
          </div>
          <ul>
              <li>
                  <h4><span><img src={tick} alt="" /></span>Start with Your Story</h4>
                  <p>Begin by thinking about the message or memory you want to share. A clear purpose makes your story more meaningful and engaging.</p>
              </li>
              <li>
                  <h4><span><img src={tick} alt="" /></span>Choose a Quiet, Comfortable Space</h4>
                  <p>Record your video in a calm environment with minimal background noise so your voice and emotions come through clearly.</p>
              </li>
              <li>
                  <h4><span><img src={tick} alt="" /></span>Speak Naturally</h4>
                  <p>Talk as if you’re sharing your story with a close friend. Being natural helps your story feel authentic and relatable.</p>
              </li>
              <li>
                  <h4><span><img src={tick} alt="" /></span>Keep It Simple and Focused</h4>
                  <p>Focus on key moments instead of trying to include everything. Short, focused stories are more powerful and easier to watch.</p>
              </li>
              <li>
                  <h4><span><img src={tick} alt="" /></span>Add Visuals Thoughtfully</h4>
                  <p>Include photos, short clips, or background visuals that support your story without distracting from it.</p>
              </li>
              <li>
                  <h4><span><img src={tick} alt="" /></span>Review Before Publishing</h4>
                  <p>Watch your video once before sharing. This helps you catch small improvements and ensures your story feels complete.</p>
              </li>
              <li>
                  <h4><span><img src={tick} alt="" /></span>Share with Confidence</h4>
                  <p>Once you’re happy, share your story proudly. Your experiences may inspire and connect with others.</p>
              </li>
          </ul>
      </div>
    </>
  );
};

export default Dashboard;