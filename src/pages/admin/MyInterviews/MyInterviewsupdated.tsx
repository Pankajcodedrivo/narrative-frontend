import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import user from "../../../assets/images/user-big.png";
import userImg from "../../../assets/images/user-img.jpg";
import startIcon from "../../../assets/images/start-icon.svg";
import camaraIcon from "../../../assets/images/camara-icon.svg";
import pauseIcon from "../../../assets/images/pause-icon.svg";
import resumeIcon from "../../../assets/images/resume-btn.svg";
import "./MyInterviews.scss";

const MyInterviews = () => {
  return (
    <>
      <WelcomeHeader desc="Intro, walkthrough, then interview (voice to text)." />
      <div className="interviews-box">
        <div className="row">
          <div className="col-lg-6">
              <p className="mb-4 text-center">Recording Not Started</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="interviews-left">
                <div>
                    <div className="recording-top">
                        <h6 className="int-status"><span className="active"></span> Live</h6>
                        <div className="recording-icon">
                            <span></span>
                        </div>
                    </div>
                    <figure className="user-img"><img src={user} alt="" /></figure>
                    <div className="voice-meter mb-4">
                        <p>Voice Meter</p>
                        <ul className="voice-meter-list">
                            <li className="color-red">Too High</li>
                            <li className="color-green">Perfect</li>
                            <li className="color-blue">Too Low</li>
                        </ul>
                    </div>
                </div>
                <p className="response-txt">If you’d like, feel free to upload an image that goes along with your response</p>
                <div className="bottom-btn-wrapper">
                    <div className="left-content">
                        <span className="camara-icon"><img src={camaraIcon} alt="" /></span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="right-content">
                        {/* start recording */}
                        <button type="button" className="btn btn-primary start-btn"><span><img src={startIcon} alt="" /></span>Start Recording</button>

                        {/* stop recording */}
                        {/* <button type="button" className="btn btn-primary stop-btn"><span><img src={startIcon} alt="" /></span>Stop Recording</button> */}

                        {/* pause recording */}
                        {/* <button type="button" className="btn btn-primary"><span><img src={pauseIcon} alt="" /></span>Pause Recording</button> */}

                        {/* resume recording */}
                        {/* <button type="button" className="btn btn-primary start-btn"><span><img src={resumeIcon} alt="" /></span>Stop Recording</button> */}

                        {/* repeat question */}
                        <button type="button" className="btn btn-primary">Repeat Questions</button>

                        {/* Next Question */}
                        {/* <button type="button" className="btn btn-primary start-btn">Repeat Questions</button> */}

                        {/* Upload Image */}
                        {/* <button type="button" className="btn btn-primary">Upload Image</button> */}
                    </div>
                </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="interviews-right">
                <div className="image-wrapper mb-4">
                    <img src={userImg} alt="" />
                </div>
                <div className="response-tip mb-3">
                    <div className="mb-4">
                        <h3>Response Tip:</h3>
                        <p>As you answer, try to give your audience a picture of what you were like day to day. You might share a few words people used to describe you, and a simple example that shows those traits in action</p>
                    </div>
                    <div className="question-wrapper">
                        <div className="content-left">
                            <p>Q. How would you describe your personality as a child?</p>
                        </div>
                        <div className="content-right">
                            <p>A. I would describe my personality as…</p>
                        </div>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button type="button" className="btn btn-primary">Sample Response</button>
                    <button type="button" className="btn btn-primary">Select a Different Question</button>
                    <button type="button" className="btn btn-primary">Skip Question</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default MyInterviews;
