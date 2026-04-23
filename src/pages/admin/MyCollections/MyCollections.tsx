import { useEffect, useMemo, useRef, useState } from "react";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import videoPoster from "../../../assets/images/video-poster.jpg";
import "./MyCollections.scss";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import Table from "../../../components/Table/Table";
import {
  getMyCollections,
  refreshMyCollections,
  type CollectionItem,
} from "../../../services/apis/collection.api";

const MyCollections = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  async function loadCollections() {
    setLoading(true);
    try {
      const res = await getMyCollections();
      setItems((res?.result || []) as CollectionItem[]);
    } finally {
      setLoading(false);
    }
  }

  async function refreshCollections() {
    setRefreshing(true);
    try {
      const res = await refreshMyCollections({ limit: 10 });
      setItems((res?.result || []) as CollectionItem[]);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadCollections();
  }, []);

  useEffect(() => {
    const hasProcessing = items.some((i) => i.status === "processing");
    if (!hasProcessing) return;

    const id = window.setInterval(() => {
      void refreshCollections();
    }, 15000);

    return () => window.clearInterval(id);
  }, [items]);

  const hero = useMemo(() => {
    return items.find((i) => i.videoUrl) || items[0] || null;
  }, [items]);

  const heroStatus = hero?.status || "processing";
  const heroDate = hero?.createdAt
    ? new Date(hero.createdAt).toLocaleString()
    : "-";

  return (
    <>
      <WelcomeHeader desc="Record and manage your interview responses in one place." />

      <div className="collections-video mb-4">
        <video
          ref={videoRef}
          muted
          poster={videoPoster}
          controls={!!hero?.videoUrl}
        >
          {hero?.videoUrl ? (
            <source src={hero.videoUrl} type="video/mp4" />
          ) : null}
          Your browser does not support the video tag.
        </video>

        <button
          className="video-play-btn"
          onClick={togglePlay}
          disabled={!hero?.videoUrl}
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>

      <div className="my-life-story mb-32">
        <div className="my-life-story-hdr mb-4">
          <div className="left-part">
            <h3>My Life Story – Chapter 1 (Personal Interview)</h3>
            <ul>
              <li>
                Status:{" "}
                <span>
                  {heroStatus === "succeeded"
                    ? "Completed"
                    : heroStatus === "failed"
                      ? "Failed"
                      : "In Progress"}
                </span>
              </li>
              <li>
                Date & Time: <span>{heroDate}</span>
              </li>
            </ul>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={refreshCollections}
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            {hero?.videoUrl ? (
              <a
                className="btn btn-secondary"
                href={hero.videoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
            ) : (
              <button type="button" className="btn btn-secondary" disabled>
                Download
              </button>
            )}
          </div>
        </div>

        {hero?.error ? (
          <div className="alert alert-warning mb-0">{hero.error}</div>
        ) : null}
      </div>

      <div className="accordion p-32">
        <AccordionItem
          title="Guest Participation Details"
          isOpen={openIndex === 0}
          onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
        >
          <Table />
        </AccordionItem>

        <AccordionItem
          title="Other Generated Videos"
          isOpen={openIndex === 1}
          onToggle={() => setOpenIndex(openIndex === 1 ? null : 1)}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No generated videos yet.</td>
                    </tr>
                  ) : (
                    items.map((it) => (
                      <tr key={it._id}>
                        <td>{it.category}</td>
                        <td>
                          {it.status === "succeeded"
                            ? "Completed"
                            : it.status === "failed"
                              ? "Failed"
                              : "In Progress"}
                        </td>
                        <td>{new Date(it.createdAt).toLocaleString()}</td>
                        <td>
                          {it.videoUrl ? (
                            <a
                              className="resend-btn btn btn-outline"
                              href={it.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Download
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="resend-btn btn btn-outline"
                              onClick={() => refreshCollections()}
                              disabled={refreshing}
                            >
                              Check
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </AccordionItem>
      </div>
    </>
  );
};

export default MyCollections;
