import { useMemo, useRef, useState } from "react";
import {
  getSpeechRecognitionCtor,
  type SpeechRecognitionEventLike,
  type SpeechRecognitionLike,
} from "./myInterviews.speech";

export function useSpeechToText() {
  const speechLang = useMemo(() => navigator.language || "en-IN", []);

  const [isRecording, setIsRecording] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const finalTranscriptRef = useRef("");
  const interimTranscriptRef = useRef("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const isRecordingRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const draftTranscript = `${finalTranscript} ${interimTranscript}`.trim();

  function reset() {
    setError(null);
    setFinalTranscript("");
    setInterimTranscript("");
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";
  }

  async function start(): Promise<string | null> {
    reset();

    const SpeechRecognitionCtor = getSpeechRecognitionCtor();
    if (!SpeechRecognitionCtor) {
      const msg = "Google voice-to-text not supported in this browser.";
      setError(msg);
      return msg;
    }

    if (!window.isSecureContext) {
      const msg =
        "Voice-to-text needs a secure context (https) or localhost. Please run with https or use localhost.";
      setError(msg);
      return msg;
    }

    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());
      } catch {
        const msg =
          "Microphone permission denied. Please allow mic access and try again.";
        setError(msg);
        return msg;
      }
    }

    const recognition = new SpeechRecognitionCtor();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = speechLang || "en-IN";

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      let interim = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const txt = res[0]?.transcript || "";
        if (res.isFinal) finalText += txt;
        else interim += txt;
      }

      const nextInterim = interim.trim();
      const nextFinal = finalText.trim()
        ? `${finalTranscriptRef.current} ${finalText}`.trim()
        : finalTranscriptRef.current;

      finalTranscriptRef.current = nextFinal;
      interimTranscriptRef.current = nextInterim;

      setFinalTranscript(nextFinal);
      setInterimTranscript(nextInterim);
    };

    recognition.onerror = () => {
      setError(
        "Voice-to-text error. Please allow microphone permission, try Chrome, or type manually.",
      );
    };

    recognition.onend = () => {
      if (!isRecordingRef.current) return;
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
      restartTimerRef.current = setTimeout(() => {
        if (!isRecordingRef.current) return;
        if (recognitionRef.current !== recognition) return;
        try {
          recognition.start();
        } catch {
          // ignore
        }
      }, 250);
    };

    isRecordingRef.current = true;
    setIsRecording(true);
    try {
      recognition.start();
    } catch {
      isRecordingRef.current = false;
      setIsRecording(false);
    }

    return null;
  }

  function stop() {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    recognitionRef.current?.stop?.();
    recognitionRef.current = null;
    isRecordingRef.current = false;
    setIsRecording(false);
  }

  function cleanup() {
    stop();
  }

  return {
    isRecording,
    finalTranscript,
    interimTranscript,
    draftTranscript,
    error,
    reset,
    start,
    stop,
    cleanup,
    finalTranscriptRef,
    interimTranscriptRef,
  };
}
