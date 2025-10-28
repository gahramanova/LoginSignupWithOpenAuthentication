import React from 'react';
import { TextField, IconButton } from '@mui/material';
import { Send, AttachFile, EmojiEmotions } from '@mui/icons-material';
import { COLORS } from '../../constants/color';

interface MessageInputProps {
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  onMessageChange,
  onSendMessage
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center">
        <IconButton className="mr-2" style={{ color: COLORS.primary }}>
          <AttachFile />
        </IconButton>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Mesaj yazın..."
          size="small"
          multiline
          maxRows={4}
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{ style: { borderRadius: '24px' } }}
        />
        
        <IconButton className="ml-2" style={{ color: COLORS.primary }}>
          <EmojiEmotions />
        </IconButton>
        
        <IconButton 
          className="ml-2" 
          style={{ backgroundColor: COLORS.primary, color: 'white' }}
          onClick={onSendMessage}
        >
          <Send />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageInput;