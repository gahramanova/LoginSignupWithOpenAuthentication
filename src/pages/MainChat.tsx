import React, { useEffect, useState, useCallback } from "react";
import ChatList from "../components/ChatList/ChatList";
import ChatHeader from "../components/ChatHeader/ChatHeader";
import MessageInput from "../components/Message/MessageInput";
import MessageList from "../components/Message/MessageList";
import { ListItemText, Menu, MenuItem } from "@mui/material";
import { useSocketContext } from "../context/socketContext";
import type { Chat, Message } from "../types/chat";
import api from "../api";

const MainChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { sendMessage, onReceiveMessage, sendTyping, onUserTyping, joinRoom, socket } = useSocketContext();

  // LOAD CHATS
  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await api.get("/api/messages"); // bütün mesajlar
        const msgs = res.data;

        // Chat-ları `room` üzrə qruplaşdır
        const grouped: Record<string, Chat> = {};
        msgs.forEach((m: any) => {
          if (!grouped[m.room]) {
            grouped[m.room] = {
              id: m.room,
              name: m.sender || "User " + m.room,
              avatar: "", // default avatar
              lastMessage: m.text,
              timestamp: new Date(m.timestamp),
              isOnline: false,
              unread: 0
            };
          } else {
            grouped[m.room].lastMessage = m.text;
            grouped[m.room].timestamp = new Date(m.timestamp);
          }
        });

        const chatArray = Object.values(grouped);
        setChats(chatArray);

        if (chatArray.length) {
          setActiveChat(chatArray[0]); // ilk chat seçilir
        }

      } catch (e) {
        console.error("CHAT LOAD ERROR:", e);
      }
    };

    loadChats();
  }, []);

  // JOIN ROOM & FETCH MESSAGES
  useEffect(() => {
    if (!activeChat) return;

    joinRoom(activeChat.id);

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/messages/${activeChat.id}`);
        const data = res.data.map((m: any) => ({
          ...m,
          id: String(m.id),
          timestamp: new Date(m.timestamp)
        }));
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [activeChat, joinRoom]);

  // LISTEN FOR INCOMING MESSAGES
  useEffect(() => {
    const unsubscribe = onReceiveMessage((incoming) => {
      const arr = Array.isArray(incoming) ? incoming : [incoming];

      const normalized = arr.map((m) => ({
        ...m,
        id: String(m.id),
        timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
      }));

      setMessages(prev => {
        const existing = new Set(prev.map(m => m.id));
        return [...prev, ...normalized.filter(m => !existing.has(m.id))];
      });

      setChats(prev => {
        const last = normalized[normalized.length - 1];
        if (!last.room) return prev;

        const updatedChats = prev.map(c =>
          c.id === last.room
            ? {
                ...c,
                lastMessage: last.text,
                timestamp: new Date(),
                unread: activeChat?.id !== last.room ? (c.unread || 0) + 1 : 0
              }
            : c
        );

        const chatExists = updatedChats.some(c => c.id === last.room);
        if (!chatExists) {
          updatedChats.push({
            id: last.room,
            name: last.sender,
            avatar: "",
            lastMessage: last.text,
            timestamp: new Date(),
            isOnline: true,
            unread: 1
          });
        }

        return updatedChats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      });
    });

    return () => unsubscribe?.();
  }, [onReceiveMessage, activeChat]);

  // TYPING EVENTS
  useEffect(() => {
    const unsubscribe = onUserTyping(({ sender, room }) => {
      if (room === activeChat?.id && sender !== "You") {
        setTypingUser(sender);
        setTimeout(() => setTypingUser(null), 2000);
      }
    });

    return () => unsubscribe?.();
  }, [onUserTyping, activeChat]);

  // ONLINE STATUS
  useEffect(() => {
    if (!socket) return;

    socket.emit("user_online", "You");

    socket.on("update_users", (onlineUsers: Record<string, string>) => {
      setChats(prev => prev.map(c => ({
        ...c,
        isOnline: Boolean(onlineUsers[c.id])
      })));
    });

    return () => socket.off("update_users");
  }, [socket]);

  // SEND MESSAGE
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !activeChat) return;

    const outgoing = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "You",
      timestamp: new Date().toISOString(),
      room: activeChat.id
    };

    sendMessage(outgoing);
    setNewMessage("");
  }, [newMessage, activeChat, sendMessage]);

  // AUTO SCROLL
  useEffect(() => {
    const container = document.getElementById("message-list");
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  // MENU HANDLERS
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const handleClearChat = () => { setMessages([]); handleMenuClose(); };
  const handleViewProfile = () => { console.log("View profile", activeChat?.name); handleMenuClose(); };
  const handleToggleNotifications = () => { console.log("Toggle notifications"); handleMenuClose(); };
  const handleLeaveChat = () => { setActiveChat(null); handleMenuClose(); };
  const handleTyping = () => { if (activeChat) sendTyping("You", activeChat.id); };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList chats={chats} activeChat={activeChat} onChatSelect={setActiveChat} />

      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <ChatHeader chat={activeChat} onMenuOpen={handleMenuOpen} />
            <div id="message-list" className="flex-1 overflow-y-auto p-4">
              <MessageList messages={messages} />
            </div>
            {typingUser && <div>{typingUser} is typing...</div>}
            <MessageInput
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
            />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2 text-xl text-gray-600 mt-50">
            <p className="font-medium text-3xl">Deeply for the laptops</p>
            <span className="text-sm">Send and receive message without downloading any app.</span>
          </div>
        )}
      </div>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleViewProfile}><ListItemText>View Profile</ListItemText></MenuItem>
        <MenuItem onClick={handleClearChat}><ListItemText>Clear Chat</ListItemText></MenuItem>
        <MenuItem onClick={handleToggleNotifications}><ListItemText>Toggle Notifications</ListItemText></MenuItem>
        <MenuItem onClick={handleLeaveChat}><ListItemText>Leave Chat</ListItemText></MenuItem>
      </Menu>
    </div>
  );
};

export default MainChat;
