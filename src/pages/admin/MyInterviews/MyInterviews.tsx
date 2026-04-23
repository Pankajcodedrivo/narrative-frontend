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
  InterviewQuestion,
} from "../../../services/apis/interview.api";
import { getInterviewQuestions } from "../../../services/apis/interview.api";
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

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|bmp|svg)$/i;

const MyInterviews = () => {
  const { isLoading, questions, bookends } = useInterviewQuestions();

  const [category, setCategory] = useState<InterviewCategory>("childhood");
  const [flowIndex, setFlowIndex] = useState(0);
  const [overrideQuestion, setOverrideQuestion] =
    useState<InterviewQuestion | null>(null);

  const [questionBankOpen, setQuestionBankOpen] = useState(false);
  const [questionBankLoading, setQuestionBankLoading] = useState(false);
  const [questionBankError, setQuestionBankError] = useState<string | null>(null);
  const [questionBankSelectedId, setQuestionBankSelectedId] = useState("");
  const [questionBankAvailable, setQuestionBankAvailable] = useState<
    Partial<Record<InterviewCategory, boolean>>
  >({});
  const [questionBank, setQuestionBank] = useState<
    Partial<Record<InterviewCategory, InterviewQuestion[]>>
  >({});

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
  const [draftImageError, setDraftImageError] = useState<string | null>(null);
  const [draftImageStatus, setDraftImageStatus] = useState<"idle" | "loading">(
    "idle",
  );
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
  const imagePickTokenRef = useRef(0);
  const draftImageUrlRef = useRef<string | null>(null);
  const stopCameraRef = useRef(stopCamera);
  const speechCleanupRef = useRef(speech.cleanup);

  const [introVideoError, setIntroVideoError] = useState<string | null>(null);
  const [avatarPlayBlocked, setAvatarPlayBlocked] = useState(false);
  const [introPlayBlocked, setIntroPlayBlocked] = useState(false);
  const [avatarEnded, setAvatarEnded] = useState(false);

  const introFromEnv = (import.meta.env as Record<string, string | undefined>)
    .VITE_INTERVIEW_INTRO_URL;
  const introVideoUrl =
    bookends[0]?.videoUrl || introFromEnv || localIntroVideo || null;

  const currentFlow = useMemo(() => {
    return questions[mapKey(category, "flow")] || [];
  }, [questions, category]);

  const currentQuestion = useMemo(() => {
    return currentFlow[flowIndex] || null;
  }, [currentFlow, flowIndex]);

  const activeQuestion = useMemo(() => {
    return overrideQuestion || currentQuestion;
  }, [overrideQuestion, currentQuestion]);

  const [tourRect, setTourRect] = useState<
    { top: number; left: number; width: number; height: number } | null
  >(null);

  const sectionProgress = useMemo(() => {
    const total = currentFlow.length || 0;
    const index = Math.min(flowIndex + 1, total || 1);
    return { index, total };
  }, [currentFlow.length, flowIndex]);

  const showIntro = phase === "intro";
  const showTour = phase === "tour" || manualTourOpen;
  const interviewActive = phase === "interview";

  useEffect(() => {
    draftImageUrlRef.current = draftImageUrl;
  }, [draftImageUrl]);

  useEffect(() => {
    return () => {
      const url = draftImageUrlRef.current;
      if (!url) return;
      try {
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
    };
  }, []);

  useEffect(() => {
    if (!interviewActive) return;
    if (isLoading) return;
    if (!avatarVideoRef.current || !activeQuestion?.videoUrl) return;

    avatarVideoRef.current.src = activeQuestion.videoUrl;
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
  }, [interviewActive, isLoading, activeQuestion]);

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
    imagePickTokenRef.current += 1;
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDraftImageError(null);
    setDraftImageStatus("idle");
    setDraftImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
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
    imagePickTokenRef.current += 1;
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDraftImageError(null);
    setDraftImageStatus("idle");
    setDraftImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setOverrideQuestion(null);

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

  const answeredQuestionIds = useMemo(() => {
    const ids = new Set<string>();
    for (const m of sentMessages) {
      if (m.questionId) ids.add(m.questionId);
    }
    return ids;
  }, [sentMessages]);

  const bankQuestions = useMemo(() => {
    return questionBank[category] || [];
  }, [questionBank, category]);

  const bankAvailable = useMemo(() => {
    return bankQuestions.filter((q) => {
      if (answeredQuestionIds.has(q._id)) return false;
      if (q._id === currentQuestion?._id) return false;
      return true;
    });
  }, [bankQuestions, answeredQuestionIds, currentQuestion?._id]);

  const showPickAnotherButton = questionBankAvailable[category] === true;

  useEffect(() => {
    // Bookends do not have a database question set (only scripted flow videos).
    if (category === "bookends") {
      setQuestionBankAvailable((prev) => ({ ...prev, bookends: false }));
      return;
    }

    // Don't refetch if we already know availability for this category.
    if (questionBankAvailable[category] !== undefined) return;

    let cancelled = false;

    void (async () => {
      try {
        const res = await getInterviewQuestions({ category, setType: "database" });
        if (cancelled) return;
        const list = res.result || [];
        setQuestionBank((prev) => ({ ...prev, [category]: list }));
        setQuestionBankAvailable((prev) => ({ ...prev, [category]: list.length > 0 }));
      } catch {
        if (cancelled) return;
        setQuestionBankAvailable((prev) => ({ ...prev, [category]: false }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [category, questionBankAvailable]);

  async function openQuestionBank() {
    setQuestionBankOpen(true);
    setQuestionBankError(null);
    setQuestionBankSelectedId("");

    if (questionBank[category]?.length) return;

    setQuestionBankLoading(true);
    try {
      const res = await getInterviewQuestions({ category, setType: "database" });
      setQuestionBank((prev) => ({
        ...prev,
        [category]: res.result || [],
      }));
    } catch {
      setQuestionBankError("Failed to load question bank.");
    } finally {
      setQuestionBankLoading(false);
    }
  }

  function closeQuestionBank() {
    setQuestionBankOpen(false);
    setQuestionBankError(null);
    setQuestionBankSelectedId("");
  }

  function applyQuestionBankSelection() {
    const selected =
      bankAvailable.find((q) => q._id === questionBankSelectedId) ||
      bankQuestions.find((q) => q._id === questionBankSelectedId) ||
      null;

    if (!selected) return;

    setOverrideQuestion(selected);
    closeQuestionBank();
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
      questionId: activeQuestion?._id || null,
    };

    const allMessages = [...sentMessages, msg];
    setSentMessages(allMessages);

    setDraftText("");
    imagePickTokenRef.current += 1;
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDraftImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setDraftImageError(null);
    setDraftImageStatus("idle");

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
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (!file) {
      setDraftImageError(null);
      return;
    }

    const token = (imagePickTokenRef.current += 1);

    // Replace any previously selected draft image.
    setDraftImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setDraftImageError(null);
    setDraftImageStatus("loading");

    const type = (file.type || "").toLowerCase();
    const looksLikeImage =
      type.startsWith("image/") || IMAGE_EXT_RE.test(file.name || "");

    if (!looksLikeImage) {
      setDraftImageError("Only image files are allowed for attachments.");
      setDraftImageStatus("idle");
      return;
    }

    // Validate that the file actually decodes as an image (guards against renamed files).
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (token !== imagePickTokenRef.current) {
        URL.revokeObjectURL(url);
        return;
      }
      setDraftImageUrl(url);
      setDraftImageStatus("idle");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      if (token !== imagePickTokenRef.current) return;
      setDraftImageError("Selected file could not be read as an image.");
      setDraftImageStatus("idle");
    };
    img.src = url;
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
                  className={
                    isCameraOn
                      ? "btn btn-sm btn-secondary"
                      : "btn btn-sm btn-primary"
                  }
                  onClick={() => {
                    if (isCameraOn) {
                      stopCamera();
                      return;
                    }
                    void startCamera().catch(() => {
                      // ignore (permission denied / no device)
                    });
                  }}
                >
                  {isCameraOn ? "Disable camera" : "Enable camera"}
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
                    className="btn btn-sm btn-secondary"
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
                  {!activeQuestion?.videoUrl && (
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
                            {m.imageUrl && (
                              <div className="mt-2">
                                <img
                                  src={m.imageUrl}
                                  className="attached-image"
                                  alt="attachment"
                                />
                              </div>
                            )}
                            <p>{m.text}</p>
                          </div>
                        </div>
                      ))}

                      {/* {(speech.isRecording || draftTranscript) && (
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
                      )} */ }
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
                      className="btn btn-secondary"
                      onClick={replayQuestion}
                      disabled={
                        speech.isRecording ||
                        !interviewActive ||
                        isLoading ||
                        !activeQuestion?.videoUrl
                      }
                      title="Replay the question video"
                    >
                      Replay question
                    </button>

                    {showPickAnotherButton && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={openQuestionBank}
                        disabled={
                          speech.isRecording ||
                          !interviewActive ||
                          isLoading ||
                          isInterviewDone ||
                          isRendering
                        }
                        title="Pick a different question from the question bank"
                      >
                        Pick another question
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-primary"
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
                {draftImageUrl && (
                    <div className="attachment-strip" aria-label="Attachments">
                      <div className="attachment-chip">
                        <img src={draftImageUrl} alt="attachment preview" />
                        <button
                          type="button"
                          className="attachment-remove"
                          onClick={() => {
                            imagePickTokenRef.current += 1;
                            if (fileInputRef.current) fileInputRef.current.value = "";
                            setDraftImageUrl((prev) => {
                              if (prev) URL.revokeObjectURL(prev);
                              return null;
                            });
                            setDraftImageError(null);
                            setDraftImageStatus("idle");
                          }}
                          aria-label="Remove image"
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
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
                    className="send-btn"
                    onClick={sendDraft}
                    disabled={
                      !draftText.trim() ||
                      draftImageStatus === "loading" ||
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

                {draftImageError && (
                  <div className="alert alert-warning mt-2 mb-0">
                    {draftImageError}
                  </div>
                )}

                {draftImageStatus === "loading" && !draftImageError && (
                  <div className="text-muted mt-2" style={{ fontSize: 13 }}>
                    Validating image...
                  </div>
                )}

                {questionBankOpen && (
                  <div className="intro-modal">
                    <div className="intro-card">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h5 className="mb-0">Pick another question</h5>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={closeQuestionBank}
                        >
                          Close
                        </button>
                      </div>

                      {questionBankLoading ? (
                        <div className="p-2 text-muted">Loading question bank…</div>
                      ) : (
                        <>
                          {questionBankError ? (
                            <div className="alert alert-warning mb-2">
                              {questionBankError}
                            </div>
                          ) : null}

                          {bankAvailable.length === 0 ? (
                            <div className="alert alert-info mb-2">
                              No available questions in the database set for this section.
                            </div>
                          ) : (
                            <div className="mb-2">
                              <label className="form-label">Database questions</label>
                              <select
                                className="form-select"
                                value={questionBankSelectedId}
                                onChange={(e) => setQuestionBankSelectedId(e.target.value)}
                              >
                                <option value="">Select</option>
                                {bankAvailable.map((q) => (
                                  <option key={q._id} value={q._id}>
                                    {q.questionText.length > 90
                                      ? `${q.questionText.slice(0, 90)}…`
                                      : q.questionText}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {questionBankSelectedId ? (
                            <div className="mb-2">
                              <div className="text-muted" style={{ fontSize: 13 }}>
                                This will replace the current question for this step.
                              </div>
                            </div>
                          ) : null}

                          <div className="d-flex justify-content-end gap-2 mt-3">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => {
                                setOverrideQuestion(null);
                                closeQuestionBank();
                              }}
                            >
                              Use scripted question
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={applyQuestionBankSelection}
                              disabled={!questionBankSelectedId}
                            >
                              Use this question
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

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
                  onChange={(e) => {
                    onPickImage(e.target.files?.[0] || null);
                    e.currentTarget.value = "";
                  }}
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
