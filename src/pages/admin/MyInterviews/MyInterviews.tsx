import img1 from "../../../assets/images/im-1.png";
import img2 from "../../../assets/images/im-2.png";
import vdicon from "../../../assets/images/vd-icon.svg";
import sendicon from "../../../assets/images/send-btn.svg";
import user from "../../../assets/images/avtar-2.svg";
import attach from "../../../assets/images/attach-icon.svg";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import "./MyInterviews.scss";
const MyInterviews = () => {
  return (
    <>
      <WelcomeHeader desc="All your recorded and upcoming interviews in one place." />
      <div className="interviews-box">
        <div className="row m-0">
          <div className="col-md-6 p-0">
            <div className="interviews-left">
              <figure className="mb-0"><img src={img1} alt="" /></figure>
              <span className="vd-icon cm-icon"><img src={vdicon} alt="" /></span>
            </div>
          </div>
          <div className="col-md-6 p-0">
            <div className="interviews-right">
              <div className="top-part">
                <figure className="mb-0"><img src={img2} alt="" /></figure>
              </div>
              <div className="bottom-part">
                <div className="chat-wrapper">
                  <div className="chat-innr">
                    <div className="chat-right-outr">
                      <div className="chat-right-img">
                        <img src={user} alt="" />
                      </div>
                      <div className="chat-right-content">
                        <div className="chat-top mb-3">
                          <p>Hi! Glenn</p>
                        </div>
                        <div className="chat-bottom">
                          <div className="chat-bottom-wrapper">
                              <p>Choose Video Style:</p>
                              <ul className="radio-list">
                                <li>
                                  <label className="radio-container sm">Talking Avatar
                                    <input type="radio" checked name="radio" />
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="radio-container sm">Slideshow
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="radio-container sm">Cinematic
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="radio-container sm">Animated
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                  </label>
                                </li> 
                              </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-innr right">
                    <p>Slideshow.</p>
                  </div>
                  <div className="chat-innr">
                    <div className="chat-right-outr">
                      <div className="chat-right-img">
                        <img src={user} alt="" />
                      </div>
                      <div className="chat-right-content">
                        <div className="chat-bottom">
                          <div className="chat-bottom-wrapper">
                              <p>Tell us the story you want the video to convey.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="send-msg">
                  <div className="send-msg-input">
                    <input type="text" placeholder="Text messages ..." />
                  </div>
                  <button type="button" className="attach-icon"><img src={attach} alt="" /></button>
                  <button type="submit"><img src={sendicon} alt="" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInterviews;