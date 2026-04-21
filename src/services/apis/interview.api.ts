import httpsCall from "../httpsCall";

export type InterviewCategory =
  | "childhood"
  | "adulthood"
  | "storyhighlight"
  | "bookends";

export type InterviewSetType = "flow" | "database";

export type InterviewQuestion = {
  _id: string;
  category: InterviewCategory;
  setType: InterviewSetType;
  order: number | null;
  questionText: string;
  videoUrl: string | null;
  assetName: string | null;
  isActive: boolean;
};

export const getInterviewQuestions = async (params: {
  category: InterviewCategory;
  setType: InterviewSetType;
}) => {
  const query = new URLSearchParams({
    category: params.category,
    setType: params.setType,
  });

  const res = await httpsCall.get(`/interview/questions?${query.toString()}`);
  return res.data as { status: number; message: string; result: InterviewQuestion[] };
};

