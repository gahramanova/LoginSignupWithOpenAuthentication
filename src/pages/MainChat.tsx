import React, { useEffect, useState, useCallback } from 'react';
import ChatList from '../components/ChatList/ChatList';
import ChatHeader from '../components/ChatHeader/ChatHeader';
import MessageInput from '../components/Message/MessageInput';
import MessageList from '../components/Message/MessageList';
import { ListItemText, Menu, MenuItem } from '@mui/material';
import useSocket from '../hooks/useSocket';
import type { Chat, Message } from '../types/chart';

const MainChat = () => {
  const [chats, setChats] = useState<Chat[]>([]); // Active chats
  const [activeChat, setActiveChat] = useState<Chat | null>(null); // Active chat
  const [messages, setMessages] = useState<Message[]>([]); // Messages of active chat
  const [newMessage, setNewMessage] = useState(''); // New message input
  const [typingUser, setTypingUser] = useState<string | null>(null); // Typing user
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null); // Menu anchor for settings

  const { socket, sendMessage, onReceiveMessage, sendTyping, onUserTyping, joinRoom } = useSocket("http://localhost:3001");

  // Fetch chat list when the component mounts
    useEffect(() => {
    // Fetch real chat list from backend here
    // Example (replace this with actual API call):
    const fetchedChats: Chat[] = [
      { id: '1', name: 'Narmin Gahramanova', avatar: '', lastMessage: 'How are you?', timestamp: new Date(), unread: 2, isOnline: true },
      { id: '2', name: 'Mika', avatar: '', lastMessage: 'Yes, I solved it', timestamp: new Date(), unread: 0, isOnline: false },
      { id: '3', name: 'Maria Ochab', avatar: '', lastMessage: 'The meeting will be at 15:00 today?', timestamp: new Date(), unread: 1, isOnline: true }
    ];
    setChats(fetchedChats); // Update the chats list
  }, []);

  // When active chat changes, load messages for that chat
  useEffect(() => {
    if (activeChat && activeChat.id) {
      setMessages([]); // Clear current messages when chat changes
      joinRoom(activeChat.id); // Join the room of the active chat
    }
  }, [activeChat]);

  // Listen for incoming messages
  // Subscribe to incoming messages from socket (replace existing useEffect)
useEffect(() => {
  if (!onReceiveMessage) return;

  const unsub = onReceiveMessage((incoming: Message | Message[]) => {
    // normalize to array
    const incomingArr = Array.isArray(incoming) ? incoming : [incoming];

    // normalize timestamps and ids
    const normalized = incomingArr.map((m) => ({
      ...m,
      id: String(m.id),
      timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
    }));

    setMessages(prev => {
      // create a set of existing ids to avoid duplicates
      const existingIds = new Set(prev.map(p => p.id));
      const toAdd = normalized.filter(m => !existingIds.has(m.id));
      if (toAdd.length === 0) return prev;
      return [...prev, ...toAdd];
    });

    // optional: update chats list lastMessage/timestamp
    setChats(prev => {
      // if incoming messages belong to some chat, find that chat and update
      const last = normalized[normalized.length - 1];
      if (!last?.room) return prev;
      return prev.map(c => c.id === last.room ? { ...c, lastMessage: last.text, timestamp: new Date() } : c);
    });
  });

  return () => unsub?.();
}, [onReceiveMessage, setChats]);

  // Handle typing indicator
  useEffect(() => {
    if (!onUserTyping) return;

    const unsubTyping = onUserTyping(({ sender, room }) => {
      if (room === activeChat?.id && sender !== "You") {
        setTypingUser(sender); // Show typing indicator
        setTimeout(() => setTypingUser(null), 2000); // Hide typing after 2 seconds
      }
    });

    return () => unsubTyping?.(); // Clean up typing event listener
  }, [onUserTyping, activeChat]);


  

  // Send a message to backend
const handleSendMessage = useCallback(() => {
  if (newMessage.trim() === '' || !activeChat) return;

  const outgoing = {
    id: Date.now().toString(),
    text: newMessage,
    sender: 'You',
    timestamp: new Date().toISOString(), // send ISO string
    room: activeChat.id,
  };

  // send to server; server should broadcast back to room (including sender)
  sendMessage(outgoing, (ack: any) => {
    // optional ack handling: if server sends ack you can update status
    if (ack?.status === 'ok') {
      // nothing (server will emit receiveMessage which we handle)
    } else {
      console.error('Message not delivered', ack);
    }
  });

  setNewMessage('');
}, [newMessage, activeChat, sendMessage]);


  // Handle menu open and close
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null); // Close the menu
  };

  const handleClearChat = () => {
    if (activeChat) {
      setMessages([]); // Clear chat messages for active chat
    }
    handleMenuClose(); // Close the menu
  };

  const handleViewProfile = () => {
    console.log('View profile for', activeChat?.name);
    handleMenuClose(); // Close the menu
  };

  const handleToggleNotifications = () => {
    console.log('Toggle notifications');
    handleMenuClose(); // Close the menu
  };

  const handleLeaveChat = () => {
    console.log('Leave chat');
    setActiveChat(null); // Set active chat to null, effectively "leaving" it
    handleMenuClose(); // Close the menu
  };

  const handleTyping = () => {
    sendTyping("You", activeChat?.id);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList chats={chats} activeChat={activeChat} onChatSelect={setActiveChat} />
      
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <ChatHeader chat={activeChat} onMenuOpen={handleMenuOpen} />
            <MessageList messages={messages} />
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
            <p className='font-medium text-3xl'>Deeply for the laptops</p>
            <span className='text-sm'>Send and receive message without downloading any app.</span>
            
          </div>
        )}
      </div>

      {/* MENU */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleViewProfile}>
          <ListItemText>View Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClearChat}>
          <ListItemText>Clear Chat</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleToggleNotifications}>
          <ListItemText>Toggle Notifications</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLeaveChat}>
          <ListItemText>Leave Chat</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainChat;
