import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

export type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
  meta?: Record<string, unknown> | null;
};

export const getMyNotifications = catchAsync(async () => {
  const res = await httpsCall.get(`/profile/notifications`);
  return res;
});

export const markNotificationRead = catchAsync(async (notificationId: string) => {
  const res = await httpsCall.patch(
    `/profile/notifications/${encodeURIComponent(notificationId)}/read`,
  );
  return res;
});

export const markAllNotificationsRead = catchAsync(async () => {
  const res = await httpsCall.patch(`/profile/notifications/read-all`);
  return res;
});
