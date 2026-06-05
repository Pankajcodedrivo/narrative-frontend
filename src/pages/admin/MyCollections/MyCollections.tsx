import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import videoPoster from "../../../assets/images/video-poster.jpg";
import "./MyCollections.scss";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import Table from "../../../components/Table/Table";
import {
  getMyCollections,
  regenerateMyCollection,
  refreshMyCollections,
  type CollectionItem,
} from "../../../services/apis/collection.api";

const MyCollections = () => {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const renderState = (location.state as
    | { renderId?: string; renderError?: string; renderPending?: boolean }
    | null
    | undefined) || null;

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

  async function regenerateCollection(item: CollectionItem) {
    setRegeneratingId(item._id);
    try {
      const res = await regenerateMyCollection(item._id);
      setItems((res?.result || []) as CollectionItem[]);
    } finally {
      setRegeneratingId(null);
    }
  }

  useEffect(() => {
    loadCollections();
  }, []);

  useEffect(() => {
    if (!renderState?.renderId && !renderState?.renderPending) return;
    void refreshCollections();
  }, [renderState?.renderId, renderState?.renderPending]);

  useEffect(() => {
    if (!renderState?.renderId) return;

    const el = document.getElementById(`collection-row-${renderState.renderId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [items, renderState?.renderId]);

  useEffect(() => {
    const hasProcessing = items.some((i) => i.status === "processing");
    if (!hasProcessing) return;

    const id = window.setInterval(() => {
      void refreshCollections();
    }, 15000);

    return () => window.clearInterval(id);
  }, [items]);

  const hero = useMemo(() => {
    if (renderState?.renderId) {
      const match = items.find((item) => item.taskId === renderState.renderId);
      if (match) return match;
    }

    return items[0] || null;
  }, [items, renderState?.renderId]);

  const heroStatus = hero?.status || "processing";
  const heroStatusLabel =
    heroStatus === "succeeded"
      ? "Completed"
      : heroStatus === "failed"
        ? "Failed"
        : "In Progress";
  const heroDate = hero?.createdAt
    ? new Date(hero.createdAt).toLocaleString()
    : "-";
  const heroIsProcessing = heroStatus === "processing";
  const highlightedTaskId = renderState?.renderId || null;

  function renderStatusLabel(status: CollectionItem["status"]) {
    if (status === "succeeded") return "Completed";
    if (status === "failed") return "Failed";
    return "In Progress";
  }

  return (
    <>
      <WelcomeHeader desc="Record and manage your interview responses in one place." />

      {renderState?.renderId || renderState?.renderPending ? (
        <div className="alert alert-info mb-4 collection-handoff-banner">
          Your interview video is in progress in the background.
          {renderState?.renderId ? (
            <div className="small mt-1">
              Render ID: <strong>{renderState.renderId}</strong>
            </div>
          ) : null}
        </div>
      ) : null}

      {renderState?.renderError ? (
        <div className="alert alert-warning mb-4">{renderState.renderError}</div>
      ) : null}

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

      <div
        className={`my-life-story mb-32 ${
          heroStatus === "processing" ? "my-life-story--processing" : ""
        }`}
      >
        <div className="my-life-story-hdr mb-4">
          <div className="left-part">
            <h3>My Life Story (Personal Interview)</h3>
            <ul>
              <li>
                Status: <span>{heroStatusLabel}</span>
              </li>
              <li>
                Date & Time: <span>{heroDate}</span>
              </li>
            </ul>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={refreshCollections}
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            {hero?.status === "failed" ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => hero && void regenerateCollection(hero)}
                disabled={regeneratingId === hero._id}
              >
                {regeneratingId === hero._id ? "Regenerating..." : "Regenerate"}
              </button>
            ) : hero?.videoUrl ? (
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
        ) : heroIsProcessing ? (
          <div className="alert alert-info mb-0">
            Video is in progress in the background. You can leave this page and
            come back later.
          </div>
        ) : null}

        {hero?.status === "failed" ? (
          <div className="alert alert-danger mb-0 mt-2">
            Video generation failed. Use regenerate to queue it again.
          </div>
        ) : null}
      </div>

      <div className="my-life-story mb-32">
        <div className="my-life-story-hdr mb-4">
          <div className="left-part">
            <h3>Generated Videos</h3>
            <ul>
              <li>
                Total: <span>{items.length}</span>
              </li>
              <li>
                Latest: <span>{heroStatusLabel}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Video</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4}>No generated videos yet.</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    id={`collection-row-${item.taskId}`}
                    className={item.taskId === highlightedTaskId ? "is-highlighted" : ""}
                  >
                    <td>{item.category}</td>
                    <td>{renderStatusLabel(item.status)}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      {item.status === "failed" ? (
                        <button
                          type="button"
                          className="resend-btn btn btn-outline"
                          onClick={() => void regenerateCollection(item)}
                          disabled={regeneratingId === item._id}
                        >
                          {regeneratingId === item._id
                            ? "Regenerating..."
                            : "Regenerate"}
                        </button>
                      ) : item.videoUrl ? (
                        <a
                          className="resend-btn btn btn-outline"
                          href={item.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Watch
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="resend-btn btn btn-outline"
                          disabled
                        >
                          In Progress...
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="accordion p-32">
        <AccordionItem
          title="Guest Participation Details"
          isOpen={openIndex === 0}
          onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
        >
          <Table />
        </AccordionItem>
      </div>
    </>
  );
};

export default MyCollections;
