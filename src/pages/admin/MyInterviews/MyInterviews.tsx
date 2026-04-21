import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import img1 from "../../../assets/images/im-1.png";
import img2 from "../../../assets/images/im-2.png";
import localIntroVideo from "../../../assets/video/into.mp4";
import attachIcon from "../../../assets/images/attach-icon.svg";
import sendicon from "../../../assets/images/send-btn.svg";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import type {
  InterviewCategory,
} from "../../../services/apis/interview.api";
import { klingRenderByCategory } from "../../../services/apis/kling.api";
import { CATEGORY_ORDER, mapKey } from "./myInterviews.constants";
import { useCameraPreview } from "./useCameraPreview";
import { useInterviewQuestions } from "./useInterviewQuestions";
import { useIntroTourPhase } from "./useIntroTourPhase";
import { useSpeechToText } from "./useSpeechToText";
import "./MyInterviews.scss";

type TourStep = 0 | 1 | 2 | 3;

type SentMessage = {
  id: string;
  text: string;
  imageUrl: string | null;
  createdAt: number;
  category: InterviewCategory;
  questionId: string | null;
};

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

const MyInterviews = () => {
  const { isLoading, questions, bookends } = useInterviewQuestions();

  const [category, setCategory] = useState<InterviewCategory>("childhood");
  const [flowIndex, setFlowIndex] = useState(0);

  const {
    phase,
    manualTourOpen,
    setManualTourOpen,
    closeIntro: closeIntroPhase,
    closeTour: closeTourPhase,
  } = useIntroTourPhase();
  const [tourStep, setTourStep] = useState<TourStep>(0);

  const speech = useSpeechToText();

  // textarea draft + optional image
  const [draftText, setDraftText] = useState("");
  const [draftImageUrl, setDraftImageUrl] = useState<string | null>(null);
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [isInterviewDone, setIsInterviewDone] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [renderTasks, setRenderTasks] = useState<Record<string, string> | null>(
    null,
  );
  const [renderError, setRenderError] = useState<string | null>(null);

  const userPanelRef = useRef<HTMLDivElement | null>(null);
  const avatarPanelRef = useRef<HTMLDivElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  const { userVideoRef, isCameraOn, startCamera, stopCamera } =
    useCameraPreview();
  const avatarVideoRef = useRef<HTMLVideoElement | null>(null);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stopCameraRef = useRef(stopCamera);
  const speechCleanupRef = useRef(speech.cleanup);

  const [introVideoError, setIntroVideoError] = useState<string | null>(null);
  const [avatarPlayBlocked, setAvatarPlayBlocked] = useState(false);
  const [introPlayBlocked, setIntroPlayBlocked] = useState(false);
  const [avatarEnded, setAvatarEnded] = useState(false);

  const introFromEnv = (import.meta.env as Record<string, string | undefined>)
    .VITE_INTERVIEW_INTRO_URL;
  const introVideoUrl =
    localIntroVideo || bookends[0]?.videoUrl || introFromEnv || null;

  const currentFlow = useMemo(() => {
    return questions[mapKey(category, "flow")] || [];
  }, [questions, category]);

  const currentQuestion = useMemo(() => {
    return currentFlow[flowIndex] || null;
  }, [currentFlow, flowIndex]);

  const [tourRect, setTourRect] = useState<
    { top: number; left: number; width: number; height: number } | null
  >(null);

  const sectionProgress = useMemo(() => {
    const total = currentFlow.length || 0;
    const index = Math.min(flowIndex + 1, total || 1);
    return { index, total };
  }, [currentFlow.length, flowIndex]);

  const draftTranscript = speech.draftTranscript;
  const showIntro = phase === "intro";
  const showTour = phase === "tour" || manualTourOpen;
  const interviewActive = phase === "interview";

  useEffect(() => {
    if (!interviewActive) return;
    if (isLoading) return;
    if (!avatarVideoRef.current || !currentQuestion?.videoUrl) return;

    avatarVideoRef.current.src = currentQuestion.videoUrl;
    avatarVideoRef.current
      .play()
      .then(() => {
        setAvatarPlayBlocked(false);
        setAvatarEnded(false);
      })
      .catch(() => {
        // autoplay can be blocked; show a Play button overlay
        setAvatarPlayBlocked(true);
        setAvatarEnded(false);
      });
  }, [interviewActive, isLoading, currentQuestion]);

  useEffect(() => {
    if (!showIntro) return;
    if (!introVideoUrl) return;
    if (!introVideoRef.current) return;

    introVideoRef.current
      .play()
      .then(() => setIntroPlayBlocked(false))
      .catch(() => setIntroPlayBlocked(true));
  }, [showIntro, introVideoUrl]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [
    sentMessages.length,
    speech.isRecording,
    speech.finalTranscript.length,
    speech.interimTranscript.length,
  ]);

  useEffect(() => {
    stopCameraRef.current = stopCamera;
  }, [stopCamera]);

  useEffect(() => {
    speechCleanupRef.current = speech.cleanup;
  }, [speech.cleanup]);

  useEffect(() => {
    return () => {
      stopCameraRef.current();
      speechCleanupRef.current();
    };
  }, []);

  useEffect(() => {
    if (!showTour) return;

    const pad = 10;
    let raf = 0;

    const getEl = () => {
      if (tourStep === 0) return userPanelRef.current;
      if (tourStep === 1) return avatarPanelRef.current;
      if (tourStep === 2) return transcriptRef.current;
      return controlsRef.current;
    };

    const update = () => {
      const el = getEl();
      const rect = el?.getBoundingClientRect();
      if (!rect) {
        setTourRect(null);
        return;
      }
      setTourRect({
        top: Math.max(0, rect.top - pad),
        left: Math.max(0, rect.left - pad),
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
      });
    };

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
    };
  }, [showTour, tourStep]);

  function closeIntro() {
    setIntroVideoError(null);
    setIntroPlayBlocked(false);
    closeIntroPhase();
    setTourStep(0);
  }

  function closeTour(isManual: boolean) {
    closeTourPhase(isManual);
    if (!isManual) setTourStep(0);
  }

  async function startRecording() {
    if (!interviewActive) return;
    setDraftText("");
    setDraftImageUrl(null);
    const err = await speech.start();
    if (err) setDraftText(err);
  }

  function stopRecording() {
    speech.stop();
    setDraftText(
      `${speech.finalTranscriptRef.current} ${speech.interimTranscriptRef.current}`.trim(),
    );
  }

  function replayQuestion() {
    if (!avatarVideoRef.current) return;
    setAvatarEnded(false);
    setAvatarPlayBlocked(false);
    try {
      avatarVideoRef.current.currentTime = 0;
    } catch {
      // ignore
    }
    avatarVideoRef.current.play().catch(() => setAvatarPlayBlocked(true));
  }

  function nextQuestion() {
    setDraftText("");
    speech.reset();
    setDraftImageUrl(null);

    if (flowIndex + 1 < currentFlow.length) {
      setFlowIndex((i) => i + 1);
      return;
    }

    const currentCategoryIndex = CATEGORY_ORDER.indexOf(category);
    const nextCategory = CATEGORY_ORDER[currentCategoryIndex + 1];
    if (nextCategory) {
      setCategory(nextCategory);
      setFlowIndex(0);
    }
  }

  function sendDraft() {
    const text = draftText.trim();
    if (!text) return;

    const msg: SentMessage = {
      id: makeId(),
      text,
      imageUrl: draftImageUrl,
      createdAt: Date.now(),
      category,
      questionId: currentQuestion?._id || null,
    };

    const allMessages = [...sentMessages, msg];
    setSentMessages(allMessages);

    setDraftText("");
    setDraftImageUrl(null);

    const isLastCategory =
      CATEGORY_ORDER.indexOf(category) === CATEGORY_ORDER.length - 1;
    const isLastQuestion = flowIndex === Math.max(0, currentFlow.length - 1);

    if (isLastCategory && isLastQuestion) {
      setIsInterviewDone(true);
      setIsRendering(true);
      setRenderError(null);
      setRenderTasks(null);
      speech.reset();

      void (async () => {
        try {
          const res = await klingRenderByCategory({
            answers: allMessages.map((m) => ({
              category: m.category,
              questionId: m.questionId,
              text: m.text,
              imageUrl: m.imageUrl,
            })),
          });
          setRenderTasks(res.result.tasks || {});
        } catch (e) {
          setRenderError(
            (e as Error)?.message || "Failed to start Kling rendering.",
          );
        } finally {
          setIsRendering(false);
        }
      })();

      return;
    }

    nextQuestion();
  }

  function onPickImage(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setDraftImageUrl(url);
  }

  function tourText(step: TourStep) {
    if (step === 0) return "This is your camera preview (optional).";
    if (step === 1) return "This is the question video (AI avatar).";
    if (step === 2)
      return "Your voice-to-text transcript shows here (and in the textbox).";
    return "Use Record/Stop, attach, and Send.";
  }

  return (
    <>
      <WelcomeHeader desc="Intro, walkthrough, then interview (voice to text)." />

      <div className="interviews-box">
        <div className="row m-0">
          <div className="col-lg-6 p-0">
            <div className="interviews-left" ref={userPanelRef}>
              <div className="panel-title d-flex align-items-center justify-content-between">
                <span>You</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={startCamera}
                >
                  Enable camera
                </button>
              </div>

              <div className="panel-media">
                <video
                  ref={userVideoRef}
                  className="user-video"
                  autoPlay
                  muted
                  playsInline
                />
                {!isCameraOn && (
                  <figure className="mb-0 placeholder-figure">
                    <img src={img1} alt="Camera placeholder" />
                  </figure>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6 p-0">
            <div className="interviews-right">
              <div className="top-part" ref={avatarPanelRef}>
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div>
                    <div className="section-pill">
                      {category.toUpperCase()} • {sectionProgress.index}/
                      {sectionProgress.total || 0}
                    </div>
                    <div className="small text-muted mt-1">
                      Question video plays here
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setManualTourOpen(true)}
                  >
                    Walkthrough
                  </button>
                </div>

                <div className="avatar-media">
                  <div className="video-shell">
                    <video
                      ref={avatarVideoRef}
                      className="avatar-video"
                      playsInline
                      onEnded={() => setAvatarEnded(true)}
                      onPlay={() => {
                        setAvatarPlayBlocked(false);
                        setAvatarEnded(false);
                      }}
                    />
                    {avatarPlayBlocked && (
                      <div className="video-overlay">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            avatarVideoRef.current
                              ?.play()
                              .then(() => setAvatarPlayBlocked(false))
                              .catch(() => setAvatarPlayBlocked(true));
                          }}
                        >
                          Play question
                        </button>
                      </div>
                    )}

                    {avatarEnded && !avatarPlayBlocked && (
                      <div className="video-overlay">
                        <button
                          type="button"
                          className="btn btn-outline-light"
                          onClick={replayQuestion}
                        >
                          Replay
                        </button>
                      </div>
                    )}
                  </div>
                  {!currentQuestion?.videoUrl && (
                    <figure className="mb-0 placeholder-figure">
                      <img src={img2} alt="Avatar placeholder" />
                    </figure>
                  )}
                </div>
              </div>

              <div className="bottom-part">
                <div className="chat-wrapper transcript" ref={transcriptRef}>
                  {isLoading && <div className="p-3 text-muted">Loading…</div>}

                  {!isLoading && (
                    <>
                      {sentMessages.map((m) => (
                        <div key={m.id} className="chat-innr right">
                          <div className="chat-self">
                            <p>{m.text}</p>
                            {m.imageUrl && (
                              <div className="mt-2">
                                <img
                                  src={m.imageUrl}
                                  className="attached-image"
                                  alt="attachment"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {(speech.isRecording || draftTranscript) && (
                        <div className="chat-innr right live-transcript">
                          <div className="chat-self">
                            <p>
                              <span className="live-pill">LIVE</span>{" "}
                              {speech.finalTranscript}{" "}
                              {speech.interimTranscript && (
                                <span className="interim">
                                  {speech.interimTranscript}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="interview-controls" ref={controlsRef}>
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    {!speech.isRecording ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={startRecording}
                        disabled={
                          !interviewActive ||
                          isLoading ||
                          showTour ||
                          isInterviewDone ||
                          isRendering
                        }
                      >
                        Record (voice to text)
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={stopRecording}
                      >
                        Stop
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={replayQuestion}
                      disabled={
                        speech.isRecording ||
                        !interviewActive ||
                        isLoading ||
                        !currentQuestion?.videoUrl
                      }
                      title="Replay the question video"
                    >
                      Replay question
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={nextQuestion}
                      disabled={
                        speech.isRecording ||
                        !interviewActive ||
                        isInterviewDone ||
                        isRendering
                      }
                    >
                      Next question
                    </button>
                  </div>
                </div>

                <div className="send-msg">
                  <div className="send-msg-input">
                    <textarea
                      value={speech.isRecording ? speech.draftTranscript : draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      placeholder="Record, then edit text here, attach image, and send…"
                      disabled={
                        !interviewActive ||
                        speech.isRecording ||
                        isInterviewDone ||
                        isRendering
                      }
                      rows={2}
                    />
                  </div>

                  <button
                    type="button"
                    className="attach-icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={
                      speech.isRecording ||
                      !interviewActive ||
                      isInterviewDone ||
                      isRendering
                    }
                    title="Attach an image (optional)"
                  >
                    <img src={attachIcon} alt="" />
                  </button>

                  <button
                    type="button"
                    onClick={sendDraft}
                    disabled={
                      !draftText.trim() ||
                      speech.isRecording ||
                      !interviewActive ||
                      isInterviewDone ||
                      isRendering
                    }
                    title="Send"
                  >
                    <img src={sendicon} alt="" />
                  </button>
                </div>

                {(isInterviewDone || isRendering || renderTasks || renderError) && (
                  <div className="mt-3">
                    {isRendering && (
                      <div className="alert alert-info mb-2">
                        Interview complete. Starting Kling rendering...
                      </div>
                    )}
                    {renderError && (
                      <div className="alert alert-warning mb-2">{renderError}</div>
                    )}
                    {renderTasks && (
                      <div className="alert alert-success mb-0">
                        Kling tasks started:{" "}
                        {Object.entries(renderTasks)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" | ")}
                      </div>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => onPickImage(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showIntro && (
        <div className="intro-modal">
          <div className="intro-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="mb-0">Welcome</h5>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={closeIntro}
              >
                Skip
              </button>
            </div>

            {introVideoUrl ? (
              <div className="video-shell">
                <video
                  ref={introVideoRef}
                  className="w-100"
                  autoPlay
                  playsInline
                  onError={() => {
                    setIntroVideoError(
                      `Intro video failed to load. Check S3 permissions/CORS for: ${introVideoUrl}`,
                    );
                  }}
                >
                  <source src={introVideoUrl} />
                </video>
                {introPlayBlocked && (
                  <div className="video-overlay">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        introVideoRef.current
                          ?.play()
                          .then(() => setIntroPlayBlocked(false))
                          .catch(() => setIntroPlayBlocked(true));
                      }}
                    >
                      Play intro
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="alert alert-warning mb-0">
                Intro video not found. Add a `bookends` flow video in the DB, or
                set `VITE_INTERVIEW_INTRO_URL` in `narrative-frontend/.env`.
              </div>
            )}

            {introVideoError && (
              <div className="alert alert-warning mt-2 mb-0">
                {introVideoError}
              </div>
            )}

            <div className="d-flex justify-content-end mt-3">
              <button type="button" className="btn btn-primary" onClick={closeIntro}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showTour && (
        <div className="tour-overlay">
          {tourRect && (
            <div className="tour-highlight" style={tourRect as CSSProperties} />
          )}
          <div className="tour-tooltip">
            <div className="fw-semibold mb-1">Walkthrough</div>
            <div className="text-muted">{tourText(tourStep)}</div>
            <div className="d-flex gap-2 justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => closeTour(manualTourOpen)}
              >
                Skip
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  if (tourStep === 3) {
                    closeTour(manualTourOpen);
                    return;
                  }
                  setTourStep((tourStep + 1) as TourStep);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyInterviews;
