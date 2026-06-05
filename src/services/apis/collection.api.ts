import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

export type CollectionItem = {
  _id: string;
  source: "kling" | string;
  category: string;
  taskId: string;
  status: "processing" | "succeeded" | "failed" | string;
  videoUrl: string | null;
  error?: string | null;
  renderPayload?: unknown;
  createdAt: string;
  updatedAt: string;
};

export const getMyCollections = catchAsync(async () => {
  const res = await httpsCall.get(`/profile/collections`);
  return res;
});

export const refreshMyCollections = catchAsync(async (values?: { limit?: number }) => {
  const res = await httpsCall.post(`/profile/collections/refresh`, values || {});
  return res;
});

export const regenerateMyCollection = catchAsync(async (collectionId: string) => {
  const res = await httpsCall.post(
    `/profile/collections/${encodeURIComponent(collectionId)}/regenerate`,
  );
  return res;
});
