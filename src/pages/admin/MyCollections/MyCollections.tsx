import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import videoPoster from "../../../assets/images/video-poster.jpg";
import AccordionItem from "../../../components/AccordionItem/AccordionItem";
import Table from "../../../components/Table/Table";
import {
  getMyCollections,
  regenerateMyCollection,
  refreshMyCollections,
  type CollectionItem,
} from "../../../services/apis/collection.api";
import "./MyCollections.scss";

function formatCollectionDate(
  value: string | number | Date | null | undefined,
) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
}

function formatStageLabel(value?: string | null) {
  if (!value) return "Queued";
  return value
    .replace(/_/g, " ")
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const MyCollections = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const renderState =
    (location.state as
      | { renderId?: string; renderError?: string; renderPending?: boolean }
      | null
      | undefined) || null;

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

  const shouldPoll = useMemo(() => {
    return (
      Boolean(renderState?.renderPending) ||
      items.some((item) => item.status === "processing")
    );
  }, [items, renderState?.renderPending]);

  useEffect(() => {
    if (!shouldPoll) return;

    const interval = window.setInterval(() => {
      void refreshCollections();
    }, 7000);

    return () => window.clearInterval(interval);
  }, [shouldPoll]);

  const hero = useMemo(() => {
    if (renderState?.renderId) {
      const match = items.find((item) => item.taskId === renderState.renderId);
      if (match) return match;
    }

    return items[0] || null;
  }, [items, renderState?.renderId]);

  const hasLatestVideo = Boolean(hero?.videoUrl);
  const heroStatus = hero?.status || "processing";
  const heroStatusLabel =
    heroStatus === "succeeded"
      ? "Completed"
      : heroStatus === "failed"
        ? "Failed"
        : "In Progress";
  const heroStage = formatStageLabel(hero?.currentStage);
  const heroPhase = formatStageLabel(hero?.currentPhase);
  const heroMessage =
    hero?.stageMessage ||
    (heroStatus === "failed"
      ? "The pipeline stopped and can be retried."
      : "Your collection is still being assembled in the background.");
  const heroDate = formatCollectionDate(hero?.createdAt);

  function togglePlay() {
    if (!videoRef.current || !hero?.videoUrl) return;

    if (videoRef.current.paused) {
      void videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  function handleRefresh() {
    if (!hasLatestVideo) {
      navigate("/my-interviews");
      return;
    }

    void refreshCollections();
  }

  return (
    <>
      <WelcomeHeader desc="Record and manage your interview responses in one place." />

      {renderState?.renderError ? (
        <div className="alert alert-warning mb-4">
          {renderState.renderError}
        </div>
      ) : null}

      {renderState?.renderPending ? (
        <div className="collection-handoff-banner alert alert-info mb-4">
          Your interview was submitted. The collection is building in the
          background and will update here automatically.
        </div>
      ) : null}

      {!loading && !hasLatestVideo ? (
        <div className="collections-empty mb-4">
          <div className="collections-empty__content">
            <p className="collections-empty__eyebrow">No video yet</p>
            <h3>Go to Interview page and take the interview.</h3>
            <p>
              Start the interview to create your personal story video. After you
              finish, the latest video will appear here automatically.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/my-interviews")}
              >
                Go to Interview Page
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleRefresh}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {hasLatestVideo ? (
        <>
          <div className="collections-video mb-4">
            <video
              ref={videoRef}
              muted
              poster={videoPoster}
              controls={Boolean(hero?.videoUrl)}
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
              type="button"
            >
              {playing ? "Pause" : "Play"}
            </button>
          </div>

          <div
            className={`my-life-story mb-32 ${
              heroStatus === "processing"
                ? "my-life-story--processing"
                : heroStatus === "failed"
                  ? "my-life-story--failed"
                  : "my-life-story--complete"
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
                  <li>
                    Stage: <span>{heroStage}</span>
                  </li>
                  <li>
                    Phase: <span>{heroPhase}</span>
                  </li>
                </ul>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleRefresh}
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
                    {regeneratingId === hero._id ? "Retrying..." : "Retry"}
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
                ) : null}
              </div>
            </div>

            <div className="collection-progress-panel mb-3">
              <div className="collection-progress-panel__label">
                Current status
              </div>
              <div className="collection-progress-panel__value">
                {heroStatusLabel}
              </div>
              <p className="collection-progress-panel__message">
                {heroMessage}
              </p>
              {hero?.failedStage ? (
                <div className="collection-progress-panel__failed">
                  Failed stage:{" "}
                  <span>{formatStageLabel(hero.failedStage)}</span>
                </div>
              ) : null}
              {typeof hero?.retryCount === "number" ? (
                <div className="collection-progress-panel__retry">
                  Retry count: <span>{hero.retryCount}</span>
                </div>
              ) : null}
            </div>

            {hero?.error ? (
              <div className="alert alert-warning mb-0">{hero.error}</div>
            ) : hero?.status === "failed" ? (
              <div className="alert alert-danger mb-0 mt-2">
                Video generation failed. Use retry to queue it again.
              </div>
            ) : null}
          </div>
        </>
      ) : null}

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
