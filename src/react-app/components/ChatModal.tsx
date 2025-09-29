import { useState, useRef, useEffect } from 'react';
import { X, Send, Smile, Paperclip, Phone, Video } from 'lucide-react';
import ModernButton from './ModernButton';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
  };
  currentUserId: string;
  currentUserName: string;
}

export default function ChatModal({ 
  isOpen, 
  onClose, 
  otherUser, 
  currentUserId, 
}: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: otherUser.id,
      content: 'Hi! I saw your package request. I can definitely help you with that. When would you like to arrange pickup?',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'text'
    },
    {
      id: '2',
      senderId: currentUserId,
      content: 'Great! I can meet anytime tomorrow afternoon. The package is quite small - just some documents.',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: 'text'
    },
    {
      id: '3',
      senderId: otherUser.id,
      content: 'Perfect! How about 2 PM at the coffee shop near the train station? I can give you my contact details for the actual pickup.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: newMessage.trim(),
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate response after a delay
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: otherUser.id,
          content: 'Sounds good! I\'ll see you then. Feel free to call me if you need anything: +33 6 12 34 56 78',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-background rounded-3xl shadow-elevated overflow-hidden flex flex-col h-[80vh]">
        {/* Chat Header */}
        <div className="bg-background border-b border-border-light p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
              {otherUser.avatar}
            </div>
            <div>
              <div className="font-semibold text-text-primary">{otherUser.name}</div>
              <div className="text-sm text-status-success">Online</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-background-hover rounded-xl transition-colors">
              <Phone className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="p-2 hover:bg-background-hover rounded-xl transition-colors">
              <Video className="w-5 h-5 text-text-secondary" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-background-hover rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-text-primary" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const isOwnMessage = message.senderId === currentUserId;
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    isOwnMessage
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-background-secondary text-text-primary rounded-bl-md'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      isOwnMessage ? 'text-white/70' : 'text-text-muted'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-border-light p-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-background-hover rounded-xl transition-colors">
              <Paperclip className="w-5 h-5 text-text-secondary" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="w-full bg-background-secondary rounded-2xl pl-4 pr-12 py-3 text-text-primary placeholder-text-muted border border-border-light focus:border-primary focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-background-hover rounded-xl transition-colors">
                <Smile className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            
            <ModernButton
              variant="primary"
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="!px-3 !py-3"
            >
              <Send className="w-4 h-4" />
            </ModernButton>
          </div>
        </div>

        {/* Security Notice */}
        <div className="px-4 pb-4">
          <div className="bg-primary/10 rounded-2xl p-3 text-center">
            <div className="text-xs text-primary font-medium">
              🔒 End-to-end encrypted • Messages are secure and private
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
