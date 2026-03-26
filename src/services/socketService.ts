import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  // ===============================
  // 🔌 CONNECT
  // ===============================
  connect(userId: string) {
    if (this.socket?.connected) return;

    this.socket = io(import.meta.env.VITE_API_SOCKET_URL, {
      transports: ["websocket"],
    });

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

  // ===============================
  // ❌ REMOVE LISTENERS
  // ===============================
  offAll() {
    this.socket?.off("chatStream");
    this.socket?.off("chatDone");
    this.socket?.off("typing");
    this.socket?.off("chatError");
  }

  // ===============================
  // 🔌 DISCONNECT
  // ===============================
  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

// singleton instance
const socketService = new SocketService();

export default socketService;