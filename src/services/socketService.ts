import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private currentUserId: string | null = null;

  // ===============================
  // 🔌 CONNECT
  // ===============================
  connect(userId: string) {
    if (this.socket?.connected) {
      if (this.currentUserId !== userId) {
        this.socket.emit("joinRoom", { userId });
        this.currentUserId = userId;
      }
      return;
    }

    this.socket = io(import.meta.env.VITE_API_SOCKET_URL, {
      transports: ["websocket"],
    });
    this.currentUserId = userId;

    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket?.id);

      // join user room
      this.socket?.emit("joinRoom", { userId });
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }

  // ===============================
  // 📩 SEND MESSAGE
  // ===============================
  sendMessage(userId: string, message: string) {
    this.socket?.emit("chatMessage", { userId, message });
  }

  // ===============================
  // 📡 LISTENERS
  // ===============================
  onChatStream(callback: (data: { token: string }) => void) {
    this.socket?.on("chatStream", callback);
  }

  onChatDone(callback: () => void) {
    this.socket?.on("chatDone", callback);
  }

  onTyping(callback: (data: { status: boolean }) => void) {
    this.socket?.on("typing", callback);
  }

  onError(callback: (data: { message: string }) => void) {
    this.socket?.on("chatError", callback);
  }

  onNotificationCreated(
    callback: (data: {
      notification: {
        _id: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        type: string;
      };
      unreadCount: number;
    }) => void,
  ) {
    this.socket?.on("notification:new", callback);
  }

  onNotificationUpdated(
    callback: (data: {
      notification: {
        _id: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        type: string;
      } | null;
      unreadCount: number;
      bulk?: boolean;
    }) => void,
  ) {
    this.socket?.on("notification:updated", callback);
  }

  offNotificationCreated() {
    this.socket?.off("notification:new");
  }

  offNotificationUpdated() {
    this.socket?.off("notification:updated");
  }

  // ===============================
  // ❌ REMOVE LISTENERS
  // ===============================
  offAll() {
    this.socket?.off("chatStream");
    this.socket?.off("chatDone");
    this.socket?.off("typing");
    this.socket?.off("chatError");
    this.socket?.off("notification:new");
    this.socket?.off("notification:updated");
  }

  // ===============================
  // 🔌 DISCONNECT
  // ===============================
  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
    this.currentUserId = null;
  }
}

// singleton instance
const socketService = new SocketService();

export default socketService;
