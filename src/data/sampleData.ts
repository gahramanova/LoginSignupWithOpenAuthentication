import type { Message, Chat } from "../types/chart";


// Hər sohbet üçün ayrı mesaj siyahıları
export const chatMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      text: 'Merhaba, nasılsın?',
      sender: 'Ahmet Yılmaz',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      text: 'İyiyim, teşekkürler! Sen nasılsın?',
      sender: 'You',
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      isOwn: true,
      status: 'read'
    },
    {
      id: '3',
      text: 'Ben de iyiyim. Yarın buluşalım mı?',
      sender: 'Ahmet Yılmaz',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isOwn: false,
      status: 'read'
    }
  ],
  '2': [
    {
      id: '1',
      text: 'Proje dosyalarını gönderdim',
      sender: 'Ayşe Demir',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      text: 'Teşekkürler, hemen kontrol edeceğim',
      sender: 'You',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isOwn: true,
      status: 'read'
    },
    {
      id: '3',
      text: 'Herhangi bir sorun varsa bana haber ver',
      sender: 'Ayşe Demir',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isOwn: false,
      status: 'read'
    }
  ],
  '3': [
    {
      id: '1',
      text: 'Toplantı saatini değiştirelim',
      sender: 'Mehmet Kaya',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      text: 'Saat kaçta uygun olursun?',
      sender: 'You',
      timestamp: new Date(Date.now() - 1000 * 60 * 55),
      isOwn: true,
      status: 'read'
    },
    {
      id: '3',
      text: 'Saat 15:00 nasıl?',
      sender: 'Mehmet Kaya',
      timestamp: new Date(Date.now() - 1000 * 60 * 50),
      isOwn: false,
      status: 'read'
    }
  ]
};

export const sampleChats: Chat[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    avatar: '',
    lastMessage: 'Yarın buluşalım mı?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    isOnline: true
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    avatar: '',
    lastMessage: 'Herhangi bir sorun varsa bana haber ver',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    unread: 0,
    isOnline: false
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    avatar: '',
    lastMessage: 'Saat 15:00 nasıl?',
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    unread: 1,
    isOnline: true
  },
  {
    id: '4',
    name: 'Zeynep Şahin',
    avatar: '',
    lastMessage: 'Hafta sonu için plan yapalım',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    unread: 0,
    isOnline: true
  },
  {
    id: '5',
    name: 'Can Öztürk',
    avatar: '',
    lastMessage: 'Dökümanları inceledin mi?',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    unread: 3,
    isOnline: false
  }
];

// Boş sohbet üçün
export const emptyChatMessages: Message[] = [];

// Mesaj əlavə etmək üçün helper function
export const addMessageToChat = (chatId: string, message: Message): void => {
  if (!chatMessages[chatId]) {
    chatMessages[chatId] = [];
  }
  chatMessages[chatId].push(message);
};

// Sohbetin mesajlarını almaq üçün helper function
export const getMessagesByChatId = (chatId: string): Message[] => {
  return chatMessages[chatId] || [];
};

// Sohbetin son mesajını yeniləmək üçün helper function
export const updateChatLastMessage = (chatId: string, message: string): Chat[] => {
  return sampleChats.map(chat => 
    chat.id === chatId 
      ? { ...chat, lastMessage: message, timestamp: new Date() }
      : chat
  );
};