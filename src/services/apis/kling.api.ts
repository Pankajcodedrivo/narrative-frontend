import httpsCall from "../httpsCall";
import type { InterviewCategory } from "./interview.api";

export type KlingRenderAnswer = {
  category: InterviewCategory;
  questionId: string | null;
  text: string;
  imageUrl?: string | null;
};

export type KlingRenderOptions = {
  model?: string;
  duration?: number;
  aspect_ratio?: string;
  mode?: string;
  negative_prompt?: string;
};

export const klingRenderByCategory = async (payload: {
  answers: KlingRenderAnswer[];
  options?: KlingRenderOptions;
}) => {
  const res = await httpsCall.post("/profile/kling/render", payload);
  return res.data as {
    status: number;
    message: string;
    result: { tasks: Record<string, string> };
  };
};

export const klingGetVideoStatus = async (taskId: string) => {
  const res = await httpsCall.get(`/profile/kling/videos/${encodeURIComponent(taskId)}`);
  return res.data as { status: number; message: string; result: unknown };
};

