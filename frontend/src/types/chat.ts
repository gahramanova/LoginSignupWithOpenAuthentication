// src/types/chart.ts

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;        // component state-də Date obyektidir
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read' | 'error';
  room?: string;          // mesajın aid olduğu chat/room id (optional)
}

export type Chat = {
  id: string;
  name: string;
  avatar: string;     // <-- bu şərtdir
  lastMessage: string;
  timestamp: Date;
  isOnline: boolean;
  unread: number;
};

export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}
