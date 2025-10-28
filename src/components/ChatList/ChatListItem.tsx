import React from 'react';
import { Avatar, Badge } from '@mui/material';
import type { Chat } from '../../types/chart';
import { COLORS } from '../../constants/color';
import { formatTime } from '../../utils/utilsFunctions';

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: (chat: Chat) => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onSelect }) => {
  return (
    <div
      className={`p-3 border-b border-gray-100 cursor-pointer flex items-center ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(chat)}
    >
      <div className="relative">
        <Avatar className="w-12 h-12" style={{ backgroundColor: COLORS.accent }}>
          {chat.name.charAt(0)}
        </Avatar>
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>
      
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{chat.name}</h3>
          <span className="text-xs text-gray-500">
            {formatTime(chat.timestamp)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 truncate max-w-xs">
            {chat.lastMessage}
          </p>
          {chat.unread > 0 && (
            <Badge 
              badgeContent={chat.unread} 
              style={{ backgroundColor: COLORS.primary }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;