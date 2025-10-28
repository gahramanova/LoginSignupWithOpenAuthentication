import React, { useEffect, useState } from 'react'
import type { Chat, Message } from '../types/chart';
import { addMessageToChat, chatMessages, sampleChats } from '../data/sampleData';
import ChatList from '../components/ChatList/ChatList';
import ChatHeader from '../components/ChatHeader/ChatHeader';
import MessageInput from '../components/Message/MessageInput';
import MessageList from '../components/Message/MessageList';
import { ListItemText, Menu, MenuItem } from '@mui/material';

const MainChat = () => {
  const [chats, setChats] = useState<Chat[]>(sampleChats);
  const [activeChat, setActiveChat] = useState<Chat>(sampleChats[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // Aktiv sohbet dəyişəndə mesajları yüklə
  useEffect(() => {
    if (activeChat.id && chatMessages[activeChat.id]) {
      setMessages(chatMessages[activeChat.id]);
    } else {
      setMessages([]);
    }
    setNewMessage('');
    
    // Menu bağlansın sohbet dəyişəndə
    setMenuAnchor(null);
    
    // Oxunmamış mesajları sıfırla
    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id 
        ? { ...chat, unread: 0 }
        : chat
    ));
  }, [activeChat.id]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'You',
      timestamp: new Date(),
      isOwn: true,
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    addMessageToChat(activeChat.id, message);
    
    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id 
        ? { 
            ...chat, 
            lastMessage: newMessage, 
            timestamp: new Date(),
            unread: 0
          }
        : chat
    ));

    setNewMessage('');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // Menu funksiyaları
  const handleClearChat = () => {
    if (chatMessages[activeChat.id]) {
      chatMessages[activeChat.id] = [];
      setMessages([]);
    }
    handleMenuClose();
  };

  const handleToggleNotifications = () => {
    // Bildirim ayarı burada olacaq
    console.log('Bildirim ayarı deyiştirildi');
    handleMenuClose();
  };

  const handleViewProfile = () => {
    // Profile səhifəsinə yönləndir
    console.log('Profile görüntülenecek');
    handleMenuClose();
  };

  const handleLeaveChat = () => {
    // Sohbetten çıx
    console.log('Sohbetten çıkıldı');
    handleMenuClose();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList 
        chats={chats} 
        activeChat={activeChat} 
        onChatSelect={setActiveChat} 
      />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader chat={activeChat} onMenuOpen={handleMenuOpen} />
        <MessageList messages={messages} />
        <MessageInput
          newMessage={newMessage}
          onMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
        />
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
          <ListItemText>Profil Görüntüle</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClearChat}>
          <ListItemText>Sohbeti Temizle</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleToggleNotifications}>
          <ListItemText>Bildirimleri Kapat</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLeaveChat}>
          <ListItemText>Sohbetten Çık</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};


export default MainChat