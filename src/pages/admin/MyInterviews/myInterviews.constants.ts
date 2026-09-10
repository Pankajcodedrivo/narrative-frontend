import type { InterviewCategory } from "../../../services/apis/interview.api";

export const CATEGORY_ORDER: InterviewCategory[] = [
  "opening",
  "childhood",
  "adulthood",
  "storyhighlight",
  "closing",
];

export function mapKey(
  category: InterviewCategory,
  setType: "flow" | "database",
) {
  return `${category}:${setType}`;
}

export const SESSION_KEYS = {
  introSeen: "narrative_interview_intro_seen",
  tourDone: "narrative_interview_tour_done",
} as const;
