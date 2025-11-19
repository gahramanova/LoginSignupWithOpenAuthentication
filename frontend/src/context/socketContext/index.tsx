// src/context/SocketContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export type TypingPayload = {
  sender: string;
  room?: string;
};

export type SocketContextValue = {
  socket: Socket | null;
  sendMessage: (msg: any, ack?: (res: any) => void) => void;
  onReceiveMessage: (cb: (msg: any) => void) => () => void;
  sendTyping: (sender: string, room?: string) => void;
  onUserTyping: (cb: (payload: TypingPayload) => void) => () => void;
  joinRoom: (room: string) => void;
};

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const ref = useRef<Socket | null>(null);

  useEffect(() => {
    const s = io("http://localhost:3001", {
      transports: ["polling", "websocket"],
      path: "/socket.io",
    });

    setSocket(s);
    ref.current = s;

    return () => {
      s.off();
      s.disconnect();
      ref.current = null;
      setSocket(null);
    };
  }, []);

  // MESSAGE SENDER
  const sendMessage = (msg: any, ack?: (res: any) => void) => {
    ref.current?.emit("sendMessage", msg, (res: any) => ack?.(res));
  };

  // MESSAGE LISTENER
  const onReceiveMessage = (cb: (msg: any) => void) => {
    const handler = (msg: any) => cb(msg);
    ref.current?.on("receiveMessage", handler);
    return () => ref.current?.off("receiveMessage", handler);
  };

  // TYPING EMIT
  const sendTyping = (sender: string, room?: string) => {
    ref.current?.emit("typing", { sender, room });
  };

  // TYPING LISTENER
  const onUserTyping = (cb: (payload: TypingPayload) => void) => {
    const handler = (data: TypingPayload) => cb(data);
    ref.current?.on("userTyping", handler);
    return () => ref.current?.off("userTyping", handler);
  };

  // JOIN ROOM
  const joinRoom = (room: string) => {
    ref.current?.emit("joinRoom", room);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        sendMessage,
        onReceiveMessage,
        sendTyping,
        onUserTyping,
        joinRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocketContext must be used inside SocketProvider");
  }
  return ctx;
};
