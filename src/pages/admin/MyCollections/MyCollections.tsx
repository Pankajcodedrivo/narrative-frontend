import { useRef, useState } from "react";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import video from "../../../assets/images/video-poster.jpg";
import "./MyCollections.scss";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import Table from "../../../components/Table/Table";
const MyCollections = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
    const [playing, setPlaying] = useState(false);
  
  const togglePlay = () => {
    if (!videoRef.current) return;
  
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };
    return (
      <>
        <WelcomeHeader desc="Record and manage your interview responses in one place." />
        <div className="collections-video mb-4">
            <video ref={videoRef} muted poster={video}>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <button className="video-play-btn" onClick={togglePlay}>
              {playing ? "❚❚" : "▶"}
            </button>
        </div>
        <div className="my-life-story mb-32">
            <div className="my-life-story-hdr mb-4">
              <div className="left-part">
                  <h3>My Life Story – Chapter 1 (Personal Interview)</h3>
                  <ul>
                    <li>
                        Status: <span>Completed</span>
                    </li>
                    <li>
                        Date & Time: <span>08/15/2025, 12:00 AM </span>
                    </li>
                  </ul>
              </div>
              <button type="button" className="btn btn-secondary">Download</button>
            </div>
            <div className="my-life-story-hdr mb-0">
              <div className="left-part">
                  <h3 className="text-decoration-underline">My Life Story – Chapter 1 (Personal Interview)</h3>
                  <ul>
                    <li>
                        Status: <span> In Progress</span>
                    </li>
                    <li>
                        Date & Time: <span>08/15/2025, 12:00 AM </span>
                    </li>
                  </ul>
              </div>
              <div className="resume-btn-group">
                  <button type="button" className="btn btn-outline">Cancel</button>
                  <button type="button" className="btn btn-secondary">Resume</button>
              </div>
            </div>
        </div>
        <div className="accordion p-32">
          <AccordionItem
            title="Guest Participation Details"
            isOpen={openIndex === 0}
            onToggle={() =>
              setOpenIndex(openIndex === 0 ? null : 0)
            }
          >
           <Table />
          </AccordionItem>
          <AccordionItem
            title="Other Generated Videos"
            isOpen={openIndex === 1}
            onToggle={() =>
              setOpenIndex(openIndex === 1 ? null : 1)
            }
          >
           <Table />
          </AccordionItem>
        </div>
      </>
    );
};

export default MyCollections;