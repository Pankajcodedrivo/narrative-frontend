import { useState } from "react";
import { SESSION_KEYS } from "./myInterviews.constants";

export type Phase = "intro" | "tour" | "interview";

export function useIntroTourPhase() {
  const [phase, setPhase] = useState<Phase>(() => {
    const introSeen = sessionStorage.getItem(SESSION_KEYS.introSeen);
    const tourDone = sessionStorage.getItem(SESSION_KEYS.tourDone);

    if (!introSeen) return "intro";
    if (!tourDone) return "tour";
    return "interview";
  });
  const [manualTourOpen, setManualTourOpen] = useState(false);

  function closeIntro() {
    sessionStorage.setItem(SESSION_KEYS.introSeen, "1");
    const tourDone = sessionStorage.getItem(SESSION_KEYS.tourDone);
    if (tourDone) {
      setPhase("interview");
      return;
    }
    setPhase("tour");
  }

  function closeTour(isManual: boolean) {
    if (isManual) {
      setManualTourOpen(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEYS.tourDone, "1");
    setPhase("interview");
    setManualTourOpen(false);
  }

  return { phase, setPhase, manualTourOpen, setManualTourOpen, closeIntro, closeTour };
}
