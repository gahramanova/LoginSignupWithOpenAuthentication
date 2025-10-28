export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('tr-TR');
};