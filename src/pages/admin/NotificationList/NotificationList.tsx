import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import info from "../../../assets/images/info.svg";
import {
  getMyNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationItem,
} from "../../../services/apis/notification.api";
import socketService from "../../../services/socketService";
import type { RootState } from "../../../store/store";
import "./NotificationList.scss";

function formatNotificationDate(value: string | number | Date | null | undefined) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
}

const NotificationList = () => {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  async function loadNotifications() {
    setLoading(true);
    try {
      const res = await getMyNotifications();
      setItems((res?.result || []) as NotificationItem[]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadNotifications();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    socketService.connect(user._id);

    const handleNotificationCreated = ({
      notification,
    }: {
      notification: NotificationItem;
      unreadCount: number;
    }) => {
      setItems((prev) => {
        const exists = prev.some((item) => item._id === notification._id);
        if (exists) return prev;
        return [notification, ...prev];
      });
    };

    const handleNotificationUpdated = ({
      notification,
    }: {
      notification: NotificationItem | null;
      unreadCount: number;
    }) => {
      if (!notification) {
        void loadNotifications();
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item._id === notification._id ? { ...item, ...notification } : item,
        ),
      );
    };

    socketService.onNotificationCreated(handleNotificationCreated);
    socketService.onNotificationUpdated(handleNotificationUpdated);

    return () => {
      socketService.offNotificationCreated();
      socketService.offNotificationUpdated();
    };
  }, [user?._id]);

  async function handleMarkRead(notificationId: string) {
    await markNotificationRead(notificationId);
    await loadNotifications();
  }

  async function handleMarkAllRead() {
    setMarkingAll(true);
    try {
      await markAllNotificationsRead();
      await loadNotifications();
    } finally {
      setMarkingAll(false);
    }
  }

  return (
    <div className="notification-list">
      <div className="notification-list__header">
        <div>
          <h3>Notifications</h3>
          <p>
            Profile, interview, and video updates will appear here and in your
            email.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleMarkAllRead}
          disabled={markingAll || items.every((item) => item.read)}
        >
          {markingAll ? "Updating..." : "Mark all as read"}
        </button>
      </div>

      {loading ? <p className="notification-list__empty">Loading...</p> : null}

      {!loading && items.length === 0 ? (
        <div className="notification-list__empty">
          No notifications yet.
        </div>
      ) : null}

      {!loading && items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item._id} className={item.read ? "" : "alert"}>
              <div>
                <p>
                  <span>
                    <img className="me-2" src={info} alt="" />
                    {item.title}
                  </span>
                </p>
                <p className="notification-list__message">{item.message}</p>
                <p className="notification-list__meta">
                  {formatNotificationDate(item.createdAt)}
                </p>
              </div>
              <div className="notification-list__actions">
                {!item.read ? (
                  <button
                    type="button"
                    className="notification-list__read-btn"
                    onClick={() => void handleMarkRead(item._id)}
                  >
                    Mark read
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default NotificationList;
