// src/components/ChatList/ChatList.tsx
import React from 'react';
import type { Chat } from '../../types/chat';
import ChatListItem from './ChatListItem';

interface ChatListProps {
  chats: Chat[];
  activeChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
}



const ChatList: React.FC<ChatListProps> = ({ chats, activeChat, onChatSelect }) => {
  return (
    // sidebar: fixed width, vertical scroll
    <aside className="w-80 flex-shrink-0 bg-white border-r overflow-y-auto">
      <div className="p-2 border border-[#ccc]">
        {/* Optional header for sidebar — keep minimal so design preserved */}
        <h3 className="text-lg font-semibold px-2 py-3">Chats</h3>
      </div>

      <div>
        {chats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={activeChat?.id === chat.id}
            onSelect={onChatSelect}
          />
        ))}
      </div>
    </aside>
  );
};

export default ChatList;
