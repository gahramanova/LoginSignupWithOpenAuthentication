// src/hooks/useSocket.ts
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { Message } from "../types/chart";

/** Server-ə göndərilən payload tipi (client-only sahələr yoxdur) */
export type OutgoingMessage = {
  id: string;
  text: string;
  sender: string;
  room?: string;
  timestamp?: string | Date;
};

type UseSocketOptions = {
  username?: string;
  room?: string;
  // optional explicit URL/path override (production use)
  url?: string;
  path?: string;
};

export const useSocket = (urlOrUndefined?: string, options?: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // prefer explicit url param -> env var -> undefined (use current origin, which works with Vite proxy)
  const envUrl = (import.meta.env?.VITE_SOCKET_URL as string | undefined) ?? undefined;
  const connectUrl = urlOrUndefined ?? options?.url ?? envUrl ?? undefined;

  // prefer options.path -> env -> default '/socket.io'
  const envPath = (import.meta.env?.VITE_SOCKET_PATH as string | undefined) ?? undefined;
  const connectPath = options?.path ?? envPath ?? "/socket.io";

  useEffect(() => {
    // If connectUrl is undefined, io() will connect to current origin (works with Vite proxy)
    const s = io(connectUrl, {
      path: connectPath,
      transports: ["websocket", "polling"],
      withCredentials: true,
      auth: options?.username ? { username: options.username } : undefined,
      reconnectionAttempts: 5,
    });

    setSocket(s);
    socketRef.current = s;

    s.on("connect", () => {
      console.debug("socket connected:", s.id);
      if (options?.room) {
        s.emit("joinRoom", options.room, (ack: any) => {
          console.debug("joinRoom ack:", ack);
        });
      }
    });

    s.on("connect_error", (err) => {
      console.error("socket connect_error:", err);
    });

    return () => {
      s.off();
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
    // run only on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (payload: OutgoingMessage, ack?: (res: any) => void) => {
    if (!socketRef.current) return;
    const msg = {
      ...payload,
      timestamp: payload.timestamp
        ? (typeof payload.timestamp === "string" ? payload.timestamp : payload.timestamp.toISOString())
        : new Date().toISOString(),
    };
    socketRef.current.emit("sendMessage", msg, (response: any) => {
      if (ack) ack(response);
    });
  };

  const onReceiveMessage = (cb: (msg: Message) => void) => {
    if (!socketRef.current) return () => {};
    const handler = (msg: any) => {
      const normalized: Message = {
        id: String(msg.id),
        text: String(msg.text ?? ""),
        sender: String(msg.sender ?? "Unknown"),
        timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
        isOwn: Boolean(msg.isOwn ?? false),
        status: (msg.status as any) ?? "sent",
        room: msg.room,
      } as Message;
      cb(normalized);
    };
    socketRef.current.on("receiveMessage", handler);
    return () => socketRef.current?.off("receiveMessage", handler);
  };

  const sendTyping = (sender: string, room?: string) => {
    socketRef.current?.emit("typing", { sender, room });
  };

  const onUserTyping = (cb: (payload: { sender: string; room?: string }) => void) => {
    if (!socketRef.current) return () => {};
    const handler = (p: { sender: string; room?: string }) => cb(p);
    socketRef.current.on("userTyping", handler);
    return () => socketRef.current?.off("userTyping", handler);
  };

  const joinRoom = (room: string) => {
    socketRef.current?.emit("joinRoom", room, (ack: any) => {
      console.debug("joinRoom ack:", ack);
    });
  };

  return {
    socket,
    sendMessage,
    onReceiveMessage,
    sendTyping,
    onUserTyping,
    joinRoom,
  };
};

export default useSocket;
