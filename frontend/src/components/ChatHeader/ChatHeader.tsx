import React from 'react';
import { Avatar } from '@mui/material';
import type { Chat } from '../../types/chat';

const ChatHeader = ({ chat, onMenuOpen }: { chat: Chat | null, onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void }) => {
  return (
    <div className="flex items-center p-4 bg-gray-200">
      <Avatar className="w-10 h-10 mr-3" style={{ backgroundColor: "#3f51b5" }}>
        {chat?.name?.charAt(0)}
      </Avatar>
      <div>
        <h2 className="text-xl font-semibold">{chat?.name ?? 'Select a chat'}</h2>
        <p className="text-sm text-gray-600">{chat?.isOnline ? 'Online' : 'Offline'}</p>
      </div>
      <button onClick={onMenuOpen} className="ml-auto p-2">
        <span>☰</span>
      </button>
    </div>
  );
};


export default ChatHeader;
