import React from 'react';
import type { Chat } from '../../types/chart';
import ChatListItem from './ChatListItem';

interface ChatListProps {
  chats: Chat[];
  activeChat: Chat;
  onChatSelect: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, activeChat, onChatSelect }) => {
  return (
    <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-primary">
        <h1 className="text-xl font-bold text-white">Sohbetler</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={activeChat.id === chat.id}
            onSelect={onChatSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;