import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, Smile, Paperclip, Phone, Video, Info, Check, CheckCheck } from 'lucide-react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import ModernButton from '@/react-app/components/ModernButton';
import MessageFilter from '@/react-app/components/MessageFilter';
import PlatformMessage from '@/react-app/components/PlatformMessage';
import { detectFlaggedContent } from '@/shared/types';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  status: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: string[];
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export default function Chat() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get chat parameters from URL
  const otherUserId = searchParams.get('userId') || 'sarah_m';
  const otherUserName = searchParams.get('userName') || 'Sarah M.';
  const otherUserAvatar = searchParams.get('userAvatar') || 'SM';

  const currentUserId = 'current-user';
  
  const otherUser: ChatUser = {
    id: otherUserId,
    name: otherUserName,
    avatar: otherUserAvatar,
    isOnline: true,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: otherUser.id,
      content: 'Hi! I saw your package request. I can definitely help you with that. When would you like to arrange pickup?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: currentUserId,
      content: 'Great! I can meet anytime tomorrow afternoon. The package is quite small - just some documents.',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: otherUser.id,
      content: 'Perfect! How about 2 PM at the coffee shop near the train station? I can give you my contact details for the actual pickup.',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      senderId: currentUserId,
      content: 'Sounds perfect! That location works great for me.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '5',
      senderId: otherUser.id,
      content: 'Excellent! Looking forward to helping with your delivery. I\'ll send you my contact details closer to the pickup time.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'text',
      status: 'read'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    
    if (newMessage.length > 0) {
      setIsTyping(true);
      typingTimeout = setTimeout(() => setIsTyping(false), 1000);
    } else {
      setIsTyping(false);
    }

    return () => clearTimeout(typingTimeout);
  }, [newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Check for flagged content before sending
      if (detectFlaggedContent(newMessage)) {
        setShowWarning(true);
        return;
      }
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: newMessage.trim(),
        timestamp: new Date(),
        type: 'text',
        status: 'sending'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'sent' } : msg
        ));
      }, 500);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);

      // Simulate response after a delay
      setTimeout(() => {
        const responses = [
          'Thanks for the message!',
          'I\'ll be ready at that time.',
          'Perfect timing!',
          'Looking forward to it!',
          'Sounds good to me!',
        ];
        
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: otherUser.id,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          type: 'text',
          status: 'sent'
        };
        setMessages(prev => [...prev, response]);
        
        // Mark our message as read when they respond
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'read' } : msg
        ));
      }, 2000 + Math.random() * 3000);
    }
  };

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const hasReaction = reactions.includes(reaction);
        return {
          ...msg,
          reactions: hasReaction 
            ? reactions.filter(r => r !== reaction)
            : [...reactions, reaction]
        };
      }
      return msg;
    }));
    setShowReactions(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <div className="w-3 h-3 border border-white/50 border-t-transparent rounded-full animate-spin" />;
      case 'sent':
        return <Check className="w-3 h-3 text-white/70" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-white/70" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-accent" />;
      default:
        return null;
    }
  };

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Chat Header */}
      <div className="bg-background border-b border-border-light px-4 py-4 pt-12 sticky top-0 z-10 backdrop-blur-xl bg-background/95">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-background-hover rounded-xl transition-colors mr-2"
              >
                <ArrowLeft className="w-5 h-5 text-text-primary" />
              </button>
              
              <div className="flex items-center flex-1">
                <div className="relative mr-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {otherUser.avatar}
                  </div>
                  {otherUser.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-status-success rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-text-primary">{otherUser.name}</div>
                  <div className="text-sm text-text-secondary">
                    {otherUser.isOnline ? 'Online' : `Last seen ${formatMessageTime(otherUser.lastSeen!)}`}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="p-2 hover:bg-background-hover rounded-xl transition-colors">
                <Video className="w-5 h-5 text-text-secondary" />
              </button>
              <button className="p-2 hover:bg-background-hover rounded-xl transition-colors">
                <Phone className="w-5 h-5 text-text-secondary" />
              </button>
              <button className="p-2 hover:bg-background-hover rounded-xl transition-colors">
                <Info className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message, index) => {
            const isOwnMessage = message.senderId === currentUserId;
            const showTimestamp = index === 0 || 
              (messages[index - 1].timestamp.getTime() - message.timestamp.getTime() > 300000);
            
            return (
              <div key={message.id} className="space-y-2">
                {showTimestamp && (
                  <div className="text-center">
                    <span className="text-xs text-text-muted bg-background-secondary px-3 py-1 rounded-full">
                      {formatMessageTime(message.timestamp)}
                    </span>
                  </div>
                )}
                
                <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                  <div className="relative group max-w-[85%]">
                    <div
                      className={`px-4 py-3 rounded-2xl relative ${
                        isOwnMessage
                          ? 'bg-primary text-white rounded-br-md shadow-soft'
                          : 'bg-background-secondary text-text-primary rounded-bl-md border border-border-light'
                      }`}
                      onDoubleClick={() => setShowReactions(message.id)}
                      onClick={() => {
                        if (showReactions === message.id) {
                          setShowReactions(null);
                        }
                      }}
                    >
                      <div className="text-sm leading-relaxed">{message.content}</div>
                      
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        isOwnMessage ? 'text-white/70' : 'text-text-muted'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {isOwnMessage && getStatusIcon(message.status)}
                      </div>
                      
                      {/* Reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="absolute -bottom-2 left-2 bg-background border border-border-light rounded-full px-2 py-1 shadow-soft">
                          <div className="flex items-center space-x-1 text-xs">
                            {message.reactions.map((reaction, i) => (
                              <span key={i}>{reaction}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Reaction Picker */}
                    {showReactions === message.id && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-background border border-border-light rounded-2xl shadow-elevated p-2 z-20">
                        <div className="flex items-center space-x-2">
                          {reactions.map((reaction) => (
                            <button
                              key={reaction}
                              onClick={() => handleReaction(message.id, reaction)}
                              className="w-8 h-8 hover:bg-background-hover rounded-xl flex items-center justify-center transition-colors"
                            >
                              <span className="text-lg">{reaction}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-background-secondary rounded-2xl rounded-bl-md px-4 py-3 border border-border-light">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Filter Warning */}
      {showWarning && (
        <div className="px-4 pb-4">
          <div className="max-w-md mx-auto">
            <MessageFilter
              content={newMessage}
              onContentChange={(content) => {
                setNewMessage(content);
                setShowWarning(false);
              }}
              showWarning={showWarning}
            />
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-background border-t border-border-light px-4 py-4 sticky bottom-20 backdrop-blur-xl bg-background/95">
        <div className="max-w-md mx-auto">
          <div className="flex items-end space-x-3">
            <button className="p-2 hover:bg-background-hover rounded-xl transition-colors mb-1">
              <Paperclip className="w-5 h-5 text-text-secondary" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                rows={1}
                className="w-full bg-background-secondary rounded-2xl pl-4 pr-12 py-3 text-text-primary placeholder-text-muted border border-border-light focus:border-primary focus:outline-none resize-none min-h-[48px] max-h-32"
                style={{ 
                  height: 'auto',
                  minHeight: '48px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = '48px';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
              <button className="absolute right-2 bottom-2 p-2 hover:bg-background-hover rounded-xl transition-colors">
                <Smile className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            
            <ModernButton
              variant="primary"
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="!px-3 !py-3 mb-1"
            >
              <Send className="w-4 h-4" />
            </ModernButton>
          </div>
        </div>
      </div>

      {/* Platform Guidelines */}
      <div className="px-4 pb-4">
        <div className="max-w-md mx-auto">
          <PlatformMessage variant="info" showIcon={false} />
        </div>
      </div>

      <ModernBottomNavigation />
    </div>
  );
}
