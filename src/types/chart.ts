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

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;        // son mesajın zamanı
  unread: number;
  isOnline: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}
