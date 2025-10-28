import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { Chat } from '../../types/chart';
import { COLORS } from '../../constants/color';

interface ChatHeaderProps {
  chat: Chat;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onMenuOpen }) => {
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onMenuOpen(event);
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-primary flex justify-between items-center">
      <div className="flex items-center">
        <Avatar className="w-10 h-10 mr-3" style={{ backgroundColor: COLORS.accent }}>
          {chat.name.charAt(0)}
        </Avatar>
        <div>
          <h2 className="font-semibold text-white">{chat.name}</h2>
          <p className="text-sm text-blue-100">
            {chat.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
          </p>
        </div>
      </div>
      
      <IconButton 
        className="text-white" 
        onClick={handleMenuClick}
        aria-label="Sohbet ayarları"
      >
        <MoreVert />
      </IconButton>
    </div>
  );
};

export default ChatHeader;