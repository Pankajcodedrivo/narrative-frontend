import type { CollectionItem } from "./collection.api";
import httpsCall from "../httpsCall";

export type InterviewCategory =
  "opening" | "childhood" | "adulthood" | "storyhighlight" | "closing";

export type InterviewSetType = "flow" | "database";

export type InterviewQuestion = {
  _id: string;
  category: InterviewCategory;
  subCategory?: string | null;
  setType: InterviewSetType;
  order: number | null;
  questionText: string;
  videoUrl: string | null;
  videoKey?: string | null;
  responseText?: string | null;
  responseUrl?: string | null;
  responseKey?: string | null;
  isActive: boolean;
};

export type InterviewCompletionAnswer = {
  category: InterviewCategory;
  questionId: string | null;
  questionText?: string | null;
  responseText?: string | null;
  text: string;
  imageUrl?: string | null;
};

export type CompleteInterviewPayload = {
  answers: InterviewCompletionAnswer[];
  options?: {
    sceneDurationSec?: number;
  };
};

export const getInterviewQuestions = async (params: {
  category: InterviewCategory;
  setType: InterviewSetType;
  subCategory?: string;
  limit?: number;
}) => {
  const query = new URLSearchParams({
    category: params.category,
    setType: params.setType,
  });

  if (params.subCategory) {
    query.set("subCategory", params.subCategory);
  }

  if (typeof params.limit === "number") {
    query.set("limit", String(params.limit));
  }

  const res = await httpsCall.get(`/interview/questions?${query.toString()}`);
  return res.data as {
    status: number;
    message: string;
    result: InterviewQuestion[];
  };
};

export const getInterviewQuestionCategories = async (params: {
  category: InterviewCategory;
  setType: InterviewSetType;
}) => {
  const query = new URLSearchParams({
    category: params.category,
    setType: params.setType,
  });

  const res = await httpsCall.get(`/interview/categories?${query.toString()}`);
  return res.data as { status: number; message: string; result: string[] };
};

export const completeInterview = async (payload: CompleteInterviewPayload) => {
  const res = await httpsCall.post("/profile/interview/complete", payload);
  return res.data as {
    status: number;
    message: string;
    result: {
      collection: CollectionItem;
    };
  };
};
