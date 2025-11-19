import React from 'react';
import { Avatar } from '@mui/material';
import { COLORS } from '../../constants/color';
import { formatTime } from '../../utils/utilsFunctions';
import type { Message } from '../../types/chat';


interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`flex mb-4 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
      {!message.isOwn && (
        <Avatar className="w-8 h-8 mr-2" style={{ backgroundColor: COLORS.accent }}>
          {message.sender.charAt(0)}
        </Avatar>
      )}
      
      <div
        className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
          message.isOwn ? 'rounded-tr-none' : 'rounded-tl-none'
        }`}
        style={{
          backgroundColor: message.isOwn ? COLORS.primary : COLORS.secondary,
          color: message.isOwn ? 'white' : 'black'
        }}
      >
        {!message.isOwn && (
          <div className="font-semibold text-sm mb-1">
            {message.sender}
          </div>
        )}
        
        <div className="text-sm">{message.text}</div>
        
        <div 
          className={`text-xs mt-1 flex ${
            message.isOwn ? 'justify-end' : 'justify-start'
          }`}
          style={{
            color: message.isOwn ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'
          }}
        >
          {formatTime(message.timestamp)}
          {message.isOwn && (
            <span className="ml-1">
              {message.status === 'sent' && '✓'}
              {message.status === 'delivered' && '✓✓'}
              {message.status === 'read' && '✓✓ (Okundu)'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;