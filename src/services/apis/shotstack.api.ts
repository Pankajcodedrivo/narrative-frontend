import httpsCall from "../httpsCall";
import type { InterviewCategory } from "./interview.api";

export type InterviewRenderAnswer = {
  category: InterviewCategory;
  questionId: string | null;
  questionText?: string | null;
  responseText?: string | null;
  text: string;
  imageUrl?: string | null;
};

export type ShotstackRenderPayload = {
  answers: InterviewRenderAnswer[];
  avatarImageUrl?: string | null;
  options?: {
    sceneDurationSec?: number;
  };
};

export const uploadInterviewImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await httpsCall.post("/profile/shotstack/upload-image", formData);
  return res.data as {
    status: number;
    message: string;
    result: { imageUrl: string; imageKey: string | null };
  };
};

export const renderInterviewVideo = async (payload: ShotstackRenderPayload) => {
  const res = await httpsCall.post("/profile/shotstack/render", payload);
  return res.data as {
    status: number;
    message: string;
    result: { renderId: string; raw: unknown };
  };
};

export const getInterviewRenderStatus = async (renderId: string) => {
  const res = await httpsCall.get(
    `/profile/shotstack/render/${encodeURIComponent(renderId)}`,
  );
  return res.data as {
    status: number;
    message: string;
    result: Record<string, unknown>;
  };
};
