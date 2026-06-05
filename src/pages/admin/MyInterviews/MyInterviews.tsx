import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import WelcomeHeader from "../../../components/WelcomeHeader/WelcomeHeader";
import user from "../../../assets/images/user-big.png";
import userImg from "../../../assets/images/user-img.jpg";
import startIcon from "../../../assets/images/start-icon.svg";
import pauseIcon from "../../../assets/images/pause-icon.svg";
import resumeIcon from "../../../assets/images/resume-btn.svg";
import stopIcon from "../../../assets/images/stop-icon.svg";
import camaraIcon from "../../../assets/images/camara-icon.svg";
import type {
  InterviewCategory,
  InterviewQuestion,
} from "../../../services/apis/interview.api";
import { getInterviewQuestions } from "../../../services/apis/interview.api";
import {
  type InterviewRenderAnswer,
  renderInterviewVideo,
  uploadInterviewImage,
} from "../../../services/apis/shotstack.api";
import { CATEGORY_ORDER } from "./myInterviews.constants";
import { useCameraPreview } from "./useCameraPreview";
import { useInterviewQuestions } from "./useInterviewQuestions";
import { useSpeechToText } from "./useSpeechToText";
import "./MyInterviews.scss";

type SentMessage = {
  id: string;
  text: string;
  imageUrl: string | null;
  createdAt: number;
  category: InterviewCategory;
  questionId: string | null;
  questionText: string | null;
  responseText: string | null;
};

type RecordingStatus = "idle" | "recording" | "paused" | "stopped";
type VoiceLevel = "low" | "medium" | "high" | null;
type FinalRenderContext = {
  answers: InterviewRenderAnswer[];
  avatarImageUrl: string | null;
};

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|bmp|svg)$/i;

function getAvatarFallbackUrl() {
  try {
    return new URL(userImg, globalThis.location?.origin || "http://localhost").toString();
  } catch {
    return userImg;
  }
}

const MyInterviews = () => {
  const navigate = useNavigate();
  const { isLoading, questions } = useInterviewQuestions();

  const [category, setCategory] = useState<InterviewCategory>("childhood");
  const [flowIndex, setFlowIndex] = useState(0);
  const [overrideQuestion, setOverrideQuestion] =
    useState<InterviewQuestion | null>(null);

  const speech = useSpeechToText();
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatus>("idle");
  const [voiceLevel, setVoiceLevel] = useState<VoiceLevel>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  const [draftText, setDraftText] = useState("");
  const [draftImageUrl, setDraftImageUrl] = useState<string | null>(null);
  const [draftImageFile, setDraftImageFile] = useState<File | null>(null);
  const [draftImageError, setDraftImageError] = useState<string | null>(null);
  const [draftImageStatus, setDraftImageStatus] = useState<"idle" | "loading">(
    "idle",
  );

  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [isInterviewDone, setIsInterviewDone] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [renderTasks, setRenderTasks] = useState<Record<string, string> | null>(
    null,
  );
  const [finalRenderContext, setFinalRenderContext] =
    useState<FinalRenderContext | null>(null);
  const [renderVideoUrl, setRenderVideoUrl] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  const [questionBankOpen, setQuestionBankOpen] = useState(false);
  const [questionBankLoading, setQuestionBankLoading] = useState(false);
  const [questionBankError, setQuestionBankError] = useState<string | null>(
    null,
  );
  const [questionBankSelectedId, setQuestionBankSelectedId] = useState("");
  const [questionBankAvailable, setQuestionBankAvailable] = useState<
    Partial<Record<InterviewCategory, boolean>>
  >({});
  const [questionBank, setQuestionBank] = useState<
    Partial<Record<InterviewCategory, InterviewQuestion[]>>
  >({});

  const userPanelRef = useRef<HTMLDivElement | null>(null);
  const avatarPanelRef = useRef<HTMLDivElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  const { userVideoRef, isCameraOn, startCamera, stopCamera } =
    useCameraPreview();
  const avatarVideoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imagePickTokenRef = useRef(0);
  const draftImageUrlRef = useRef<string | null>(null);
  const stopCameraRef = useRef(stopCamera);
  const speechCleanupRef = useRef(speech.cleanup);
  const voiceMeterStreamRef = useRef<MediaStream | null>(null);
  const voiceMeterAudioRef = useRef<AudioContext | null>(null);
  const voiceMeterAnalyserRef = useRef<AnalyserNode | null>(null);
  const voiceMeterRafRef = useRef<number>(0);
  const voiceMeterSmoothedRef = useRef(0);
  const sampleResponseAudioRef = useRef<HTMLAudioElement | null>(null);
  const isMountedRef = useRef(true);

  const currentFlow = useMemo(() => {
    const key = `${category}:flow`;
    return questions[key] || [];
  }, [questions, category]);

  const currentQuestion = useMemo(() => {
    return currentFlow[flowIndex] || null;
  }, [currentFlow, flowIndex]);

  const activeQuestion = useMemo(() => {
    return overrideQuestion || currentQuestion;
  }, [overrideQuestion, currentQuestion]);

  const sectionProgress = useMemo(() => {
    const total = currentFlow.length || 0;
    const index = Math.min(flowIndex + 1, total || 1);
    return { index, total };
  }, [currentFlow.length, flowIndex]);

  const interviewActive = true;

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
    avatarVideoRef.current.play().catch(() => {
      // autoplay may be blocked; user can press "Repeat Questions"
    });
  }, [interviewActive, isLoading, activeQuestion]);

  useEffect(() => {
    stopCameraRef.current = stopCamera;
  }, [stopCamera]);

  useEffect(() => {
    speechCleanupRef.current = speech.cleanup;
  }, [speech.cleanup]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      stopCameraRef.current();
      speechCleanupRef.current();
      sampleResponseAudioRef.current?.pause();
      sampleResponseAudioRef.current = null;
      try {
        window.speechSynthesis?.cancel?.();
      } catch {
        // ignore
      }
      stopVoiceMeter();
    };
  }, []);

  function stopVoiceMeter() {
    if (voiceMeterRafRef.current) {
      cancelAnimationFrame(voiceMeterRafRef.current);
      voiceMeterRafRef.current = 0;
    }
    try {
      voiceMeterAnalyserRef.current?.disconnect?.();
    } catch {
      // ignore
    }
    voiceMeterAnalyserRef.current = null;

    const ctx = voiceMeterAudioRef.current;
    voiceMeterAudioRef.current = null;
    if (ctx) {
      void ctx.close().catch(() => {
        // ignore
      });
    }

    const stream = voiceMeterStreamRef.current;
    voiceMeterStreamRef.current = null;
    if (stream) {
      for (const t of stream.getTracks()) {
        try {
          t.stop();
        } catch {
          // ignore
        }
      }
    }

    voiceMeterSmoothedRef.current = 0;
    setVoiceLevel(null);
  }

  async function startVoiceMeter() {
    stopVoiceMeter();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      voiceMeterStreamRef.current = stream;

      const audioCtx = new AudioContext();
      voiceMeterAudioRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      voiceMeterAnalyserRef.current = analyser;

      const data = new Uint8Array(analyser.fftSize);
      const tick = () => {
        const a = voiceMeterAnalyserRef.current;
        if (!a) return;
        a.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        const prev = voiceMeterSmoothedRef.current;
        const smoothed = prev * 0.85 + rms * 0.15;
        voiceMeterSmoothedRef.current = smoothed;

        const nextLevel: VoiceLevel =
          smoothed > 0.12 ? "high" : smoothed > 0.04 ? "medium" : "low";
        setVoiceLevel((curr) => (curr === nextLevel ? curr : nextLevel));

        voiceMeterRafRef.current = requestAnimationFrame(tick);
      };
      voiceMeterRafRef.current = requestAnimationFrame(tick);
    } catch {
      // ignore (permissions, unsupported, etc.)
      stopVoiceMeter();
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
    if (category === "bookends") {
      setQuestionBankAvailable((prev) => ({ ...prev, bookends: false }));
      return;
    }
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

  async function startRecording() {
    if (!interviewActive) return;
    if (isInterviewDone || isRendering) return;
    const err = await speech.start({ resetTranscript: true });
    if (err) {
      setDraftText(err);
      return;
    }
    setRecordingStatus("recording");
    void startVoiceMeter();
  }

  function pauseRecording() {
    const transcript = speech.draftTranscript;
    speech.pause();
    setDraftText(transcript);
    setRecordingStatus("paused");
    stopVoiceMeter();
  }

  async function resumeRecording() {
    if (isInterviewDone || isRendering) return;
    const err = await speech.resume();
    if (err) {
      setDraftText(err);
      return;
    }
    setRecordingStatus("recording");
    void startVoiceMeter();
  }

  function stopRecording() {
    const transcript = speech.draftTranscript;
    speech.stop();
    setDraftText(transcript);
    setRecordingStatus("stopped");
    stopVoiceMeter();
  }

  function replayQuestion() {
    if (!avatarVideoRef.current) return;
    try {
      avatarVideoRef.current.currentTime = 0;
    } catch {
      // ignore
    }
    avatarVideoRef.current.play().catch(() => {
      // ignore
    });
  }

  function resetDraft({ keepText }: { keepText: boolean }) {
    if (!keepText) setDraftText("");
    speech.reset();
    setRecordingStatus("idle");
    setInviteOpen(false);
    try {
      window.speechSynthesis?.cancel?.();
    } catch {
      // ignore
    }
    stopVoiceMeter();
    imagePickTokenRef.current += 1;
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDraftImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setDraftImageFile(null);
    setDraftImageError(null);
    setDraftImageStatus("idle");
  }

  function nextQuestion() {
    resetDraft({ keepText: false });
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

  function onPickImage(file: File | null) {
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (!file) {
      setDraftImageFile(null);
      setDraftImageError(null);
      return;
    }

    const token = (imagePickTokenRef.current += 1);
    setDraftImageFile(file);

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
      setDraftImageFile(null);
      return;
    }

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
      setDraftImageFile(null);
    };
    img.src = url;
  }

  function openQuestionBank() {
    setQuestionBankOpen(true);
    setQuestionBankError(null);
    setQuestionBankSelectedId("");

    if (questionBank[category]?.length) return;

    setQuestionBankLoading(true);
    void (async () => {
      try {
        const res = await getInterviewQuestions({ category, setType: "database" });
        setQuestionBank((prev) => ({ ...prev, [category]: res.result || [] }));
      } catch {
        setQuestionBankError("Failed to load question bank.");
      } finally {
        setQuestionBankLoading(false);
      }
    })();
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

  function speakText(text: string) {
    const trimmed = (text || "").trim();
    if (!trimmed) return;
    try {
      sampleResponseAudioRef.current?.pause();
      window.speechSynthesis?.cancel?.();
      const utterance = new SpeechSynthesisUtterance(trimmed);
      utterance.lang = navigator.language || "en-IN";
      window.speechSynthesis?.speak?.(utterance);
    } catch {
      // ignore
    }
  }

  function playbackResponse() {
    const text = (speech.isRecording ? speech.draftTranscript : draftText).trim();
    speakText(text);
  }

  function playSampleResponse() {
    const responseUrl = activeQuestion?.responseUrl?.trim() || "";
    const responseText = activeQuestion?.responseText?.trim() || "";

    if (responseUrl) {
      const audio =
        sampleResponseAudioRef.current || new Audio();
      sampleResponseAudioRef.current = audio;

      try {
        window.speechSynthesis?.cancel?.();
        audio.pause();
        audio.currentTime = 0;
        audio.src = responseUrl;
        void audio.play().catch(() => {
          if (responseText) speakText(responseText);
        });
        return;
      } catch {
        // fall through to text-to-speech
      }
    }

    if (responseText) {
      speakText(responseText);
    }
  }

  function runFinalRender(context: FinalRenderContext) {
    if (isMountedRef.current) {
      setIsRendering(true);
      setRenderError(null);
      setRenderTasks(null);
      setRenderVideoUrl(null);
    }

    void (async () => {
      try {
        const renderResponse = await renderInterviewVideo({
          answers: context.answers,
          avatarImageUrl: context.avatarImageUrl,
        });

        toast.success("Video rendering started in the background.");
        if (isMountedRef.current) {
          setRenderTasks({ interview: renderResponse.result.renderId });
        }
      } catch (error) {
        toast.error(
          (error as Error)?.message || "Failed to start rendering.",
        );
        if (isMountedRef.current) {
          setRenderError((error as Error)?.message || "Failed to start rendering.");
        }
      } finally {
        if (isMountedRef.current) {
          setIsRendering(false);
        }
      }
    })();
  }

  function retryFinalRender() {
    if (!finalRenderContext || isRendering || isSubmittingAnswer) return;

    runFinalRender(finalRenderContext);
  }

  async function copyInviteLink(text: string) {
    if (!text) return;
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {
        // fall through
      }
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.top = "-1000px";
      textarea.style.left = "-1000px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    } catch {
      // ignore
    }
  }

  async function sendAnswer() {
    if (isSubmittingAnswer) return;

    const text = (speech.isRecording ? speech.draftTranscript : draftText).trim();
    if (!text) return;

    setIsSubmittingAnswer(true);

    try {
      let imageUrl: string | null = null;

      if (draftImageFile) {
        try {
          const uploaded = await uploadInterviewImage(draftImageFile);
          imageUrl = uploaded.result.imageUrl;
        } catch {
          setDraftImageError(
            "Image upload failed. The final video will use the avatar fallback.",
          );
        }
      }

      const msg: SentMessage = {
        id: makeId(),
        text,
        imageUrl,
        createdAt: Date.now(),
        category,
        questionId: activeQuestion?._id || null,
        questionText: activeQuestion?.questionText || null,
        responseText: activeQuestion?.responseText || null,
      };

      const allMessages = [...sentMessages, msg];
      setSentMessages(allMessages);

      const isLastCategory =
        CATEGORY_ORDER.indexOf(category) === CATEGORY_ORDER.length - 1;
      const isLastQuestion = flowIndex === Math.max(0, currentFlow.length - 1);

      resetDraft({ keepText: false });
      setOverrideQuestion(null);

        if (isLastCategory && isLastQuestion) {
          setIsInterviewDone(true);
          const avatarImageUrl = getAvatarFallbackUrl();
          const finalContext = {
            answers: allMessages.map((message) => ({
              category: message.category,
              questionId: message.questionId,
              questionText: message.questionText,
              responseText: message.responseText,
              text: message.text,
              imageUrl: message.imageUrl,
            })),
            avatarImageUrl,
          };
          setFinalRenderContext(finalContext);
          navigate("/my-collections", {
            replace: true,
            state: { renderPending: true },
          });
          runFinalRender(finalContext);

          return;
        }

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
    } finally {
      setIsSubmittingAnswer(false);
    }
  }

  const headingText = useMemo(() => {
    if (recordingStatus === "recording") return "Recording Started";
    if (recordingStatus === "paused") return "Recording Paused";
    if (recordingStatus === "stopped") return "Recording Stopped";
    return "Recording Not Started";
  }, [recordingStatus]);

  const answerPreview = useMemo(() => {
    const txt = (
      recordingStatus === "recording" ? speech.draftTranscript : draftText
    ).trim();
    if (txt) return txt;
    const lastAnswer = sentMessages[sentMessages.length - 1]?.text?.trim() || "";
    if (isInterviewDone && lastAnswer) return lastAnswer;
    return "A. (Your answer will appear here…)";
  }, [recordingStatus, speech.draftTranscript, draftText, sentMessages, isInterviewDone]);

  const currentDraft =
    recordingStatus === "recording" ? speech.draftTranscript : draftText;
  const inviteLink = useMemo(() => globalThis.location?.href || "", []);

  return (
    <>
      <WelcomeHeader desc='Interview (voice to text).' />

      <div className='interviews-box'>
        <div className='row'>
          <div className='col-lg-6'>
            <p className='mb-4 text-center'>{headingText}</p>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-6'>
            <div className='interviews-left' ref={userPanelRef}>
              <div>
                <div className='recording-top'>
                  <h6 className='int-status'>
                    <span className={speech.isRecording ? "active" : ""}></span>{" "}
                    Live
                  </h6>
                  <div className='recording-icon'>
                    <span></span>
                  </div>
                </div>

                <figure className='user-img'>
                  <video
                    ref={userVideoRef}
                    className='user-video'
                    autoPlay
                    muted
                    playsInline
                    style={{ display: isCameraOn ? "block" : "none" }}
                  />
                  {!isCameraOn ? <img src={user} alt='' /> : null}
                </figure>

                <div className='voice-meter mb-4'>
                  <p>Voice Meter</p>
                  <ul className='voice-meter-list'>
                    <li
                      className={`color-red ${voiceLevel === "high" ? "active" : ""}`}
                    >
                      High
                    </li>
                    <li
                      className={`color-green ${
                        voiceLevel === "medium" ? "active" : ""
                      }`}
                    >
                      Perfect
                    </li>
                    <li
                      className={`color-blue ${voiceLevel === "low" ? "active" : ""}`}
                    >
                      Low
                    </li>
                  </ul>
                </div>
              </div>

              <p className='response-txt'>
                If you&apos;d like, feel free to upload an image that goes along
                with your response
              </p>

              <div className='bottom-btn-wrapper' ref={controlsRef}>
                <div className='left-content'>
                  <span className='camara-icon'>
                    <img src={camaraIcon} alt='' />
                  </span>
                  <label className='switch'>
                    <input
                      type='checkbox'
                      checked={isCameraOn}
                      onChange={() => {
                        if (isCameraOn) {
                          stopCamera();
                          return;
                        }
                        void startCamera().catch(() => {
                          // ignore
                        });
                      }}
                    />
                    <span className='slider'></span>
                  </label>
                </div>

                <div className='right-content'>
                  {recordingStatus === "idle" ? (
                    <>
                      <button
                        type='button'
                        className='btn btn-primary start-btn'
                        onClick={() => void startRecording()}
                        disabled={
                          !interviewActive ||
                          isLoading ||
                          isInterviewDone ||
                          isRendering ||
                          isSubmittingAnswer
                        }
                      >
                        <span>
                          <img src={startIcon} alt='' />
                        </span>
                        Start Recording
                      </button>

                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={replayQuestion}
                        disabled={
                          !activeQuestion?.videoUrl ||
                          isLoading ||
                          isSubmittingAnswer
                        }
                        title='Replay question video'
                      >
                        Repeat Questions
                      </button>
                    </>
                  ) : null}

                  {recordingStatus === "recording" ? (
                    <>
                      <button
                        type='button'
                        className='btn btn-danger start-btn'
                        onClick={stopRecording}
                      >
                        <span>
                          <img src={stopIcon} alt='' />
                        </span>
                        Stop Recording
                      </button>
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={pauseRecording}
                      >
                        <span>
                          <img src={pauseIcon} alt='' />
                        </span>
                        Pause Recording
                      </button>
                    </>
                  ) : null}

                  {recordingStatus === "paused" ? (
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={() => void resumeRecording()}
                      disabled={
                        !interviewActive ||
                        isInterviewDone ||
                        isRendering ||
                        isSubmittingAnswer
                      }
                    >
                      <span>
                        <img src={resumeIcon} alt='' />
                      </span>
                      Resume Recording
                    </button>
                  ) : null}

                  {recordingStatus === "stopped" ? (
                    <>
                      <button
                        type='button'
                        className='btn btn-primary start-btn'
                        onClick={() => void sendAnswer()}
                        disabled={
                          !currentDraft.trim() ||
                          draftImageStatus === "loading" ||
                          !interviewActive ||
                          isInterviewDone ||
                          isRendering ||
                          isSubmittingAnswer
                        }
                      >
                        Next Question
                      </button>
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => fileInputRef.current?.click()}
                        disabled={
                          !interviewActive ||
                          isInterviewDone ||
                          isRendering ||
                          isSubmittingAnswer
                        }
                      >
                        Upload Image
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='interviews-right' ref={avatarPanelRef}>
              <div className='image-wrapper mb-4'>
                <video
                  ref={avatarVideoRef}
                  className='avatar-video'
                  playsInline
                  style={{ display: activeQuestion?.videoUrl ? "block" : "none" }}
                />
                {!activeQuestion?.videoUrl ? <img src={userImg} alt='' /> : null}
              </div>

              <div className='response-tip mb-3' ref={transcriptRef}>
                <div className='mb-4'>
                  <div className='d-flex justify-content-between align-items-start gap-2'>
                    <div>
                      <h3 className='mb-1'>Response Tip:</h3>
                      <div className='small text-muted'>
                        {category.toUpperCase()} • {sectionProgress.index}/
                        {sectionProgress.total || 0}
                      </div>
                    </div>
                  </div>
                  <p className='mt-2'>
                    {activeQuestion?.responseText ||
                      "As you answer, try to give your audience a picture of what you were like day to day. You might share a few words people used to describe you, and a simple example that shows those traits in action."}
                  </p>
                </div>

                <div className='question-wrapper'>
                  <div className='content-left'>
                    <p>
                      Q.{" "}
                      {activeQuestion?.questionText ||
                        "Loading interview question…"}
                    </p>
                  </div>
                  <div className='content-right'>
                    <p>{answerPreview}</p>
                  </div>
                </div>
                      {/*
                {sentMessages.length > 0 ? (
                  <div className='mt-2'>
                    {sentMessages.slice(-3).map((m) => (
                      <div key={m.id} className='chat-innr right'>
                        <div className='chat-self'>
                          <p>{m.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              */}

              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                style={{ display: "none" }}
                onChange={(e) => onPickImage(e.target.files?.[0] || null)}
              />

              {draftImageUrl ? (
                <div
                  className='attachment-strip attachment-strip--right'
                  aria-label='Attachments'
                >
                  <div className='attachment-chip'>
                    <img src={draftImageUrl} alt='attachment preview' />
                    <button
                      type='button'
                      className='attachment-remove'
                      onClick={() => {
                        imagePickTokenRef.current += 1;
                        if (fileInputRef.current) fileInputRef.current.value = "";
                        setDraftImageUrl((prev) => {
                          if (prev) URL.revokeObjectURL(prev);
                          return null;
                        });
                        setDraftImageFile(null);
                        setDraftImageError(null);
                        setDraftImageStatus("idle");
                      }}
                      aria-label='Remove image'
                      title='Remove'
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : null}

              {draftImageError ? (
                <div className='alert alert-warning mt-2 mb-0'>
                  {draftImageError}
                </div>
              ) : null}

              {draftImageStatus === "loading" && !draftImageError ? (
                <div className='text-muted mt-2' style={{ fontSize: 13 }}>
                  Validating image...
                </div>
              ) : null}
              </div>
              {recordingStatus === "idle" || recordingStatus === "paused" ? (
                <div className='btn-wrapper'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      //const sample = activeQuestion?.responseText || "";
                     // setDraftText(sample);
                      playSampleResponse();
                    }}
                    disabled={
                      !interviewActive ||
                      isInterviewDone ||
                      isRendering ||
                      isSubmittingAnswer
                    }
                  >
                    Sample Response
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={openQuestionBank}
                    disabled={
                      !showPickAnotherButton ||
                      !interviewActive ||
                      isLoading ||
                      isInterviewDone ||
                      isRendering ||
                      isSubmittingAnswer
                    }
                  >
                    Select a Different Question
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={nextQuestion}
                    disabled={
                      !interviewActive ||
                      isInterviewDone ||
                      isRendering ||
                      isSubmittingAnswer
                    }
                  >
                    Skip Question
                  </button>
                </div>
              ) : null}

              {recordingStatus === "stopped" ? (
                <div className='btn-wrapper'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={playbackResponse}
                    disabled={!currentDraft.trim()}
                  >
                    Playback Response
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => resetDraft({ keepText: false })}
                    disabled={
                      !interviewActive ||
                      isInterviewDone ||
                      isRendering ||
                      isSubmittingAnswer
                    }
                  >
                    Retry Response
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => setInviteOpen(true)}
                    disabled={
                      !interviewActive ||
                      isInterviewDone ||
                      isRendering ||
                      isSubmittingAnswer
                    }
                  >
                    Invite Guest
                  </button>
                </div>
              ) : null}

              {(isInterviewDone || isRendering || renderTasks || renderError) ? (
                <div className='mt-3'>
                  {isRendering ? (
                    <div className='alert alert-info mb-0'>
                      Starting rendering…
                    </div>
                  ) : null}
                  {renderError ? (
                    <div className='alert alert-warning mb-0'>
                      <div className='d-flex flex-wrap align-items-center justify-content-between gap-2'>
                        <span>{renderError}</span>
                        {finalRenderContext ? (
                          <button
                            type='button'
                            className='btn btn-sm btn-outline-dark'
                            onClick={() => void retryFinalRender()}
                            disabled={isRendering || isSubmittingAnswer}
                          >
                            Resend
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  {renderTasks ? (
                    <div className='alert alert-success mb-0'>
                      Shotstack render queued: {Object.keys(renderTasks).length}
                    </div>
                  ) : null}
                  {renderVideoUrl ? (
                    <div className='alert alert-success mb-0 mt-2'>
                      Video ready:{" "}
                      <a href={renderVideoUrl} target='_blank' rel='noreferrer'>
                        Open video
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {questionBankOpen ? (
        <div className='intro-modal'>
          <div className='intro-card'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <h5 className='mb-0'>Pick another question</h5>
              <button
                type='button'
                className='btn btn-sm btn-outline-secondary'
                onClick={closeQuestionBank}
              >
                Close
              </button>
            </div>

            {questionBankLoading ? (
              <div className='p-2 text-muted'>Loading question bank…</div>
            ) : (
              <>
                {questionBankError ? (
                  <div className='alert alert-warning mb-2'>
                    {questionBankError}
                  </div>
                ) : null}

                {bankAvailable.length === 0 ? (
                  <div className='alert alert-info mb-2'>
                    No available questions in the database set for this section.
                  </div>
                ) : (
                  <div className='mb-2'>
                    <label className='form-label'>Database questions</label>
                    <select
                      className='form-select'
                      value={questionBankSelectedId}
                      onChange={(e) => setQuestionBankSelectedId(e.target.value)}
                    >
                      <option value=''>Select</option>
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

                <div className='d-flex justify-content-end gap-2 mt-3'>
                  <button
                    type='button'
                    className='btn btn-outline-secondary'
                    onClick={() => {
                      setOverrideQuestion(null);
                      closeQuestionBank();
                    }}
                  >
                    Use scripted question
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
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
      ) : null}

      {inviteOpen ? (
        <div className='intro-modal'>
          <div className='intro-card'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <h5 className='mb-0'>Invite Guest</h5>
              <button
                type='button'
                className='btn btn-sm btn-outline-secondary'
                onClick={() => setInviteOpen(false)}
              >
                Close
              </button>
            </div>

            <div className='mb-2 text-muted' style={{ fontSize: 13 }}>
              Share this link with your guest:
            </div>

            <div className='d-flex gap-2 flex-wrap align-items-center'>
              <input
                className='form-control'
                value={inviteLink}
                readOnly
                style={{ flex: "1 1 320px" }}
              />
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => void copyInviteLink(inviteLink)}
                disabled={!inviteLink}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MyInterviews;
