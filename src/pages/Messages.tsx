import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { mockConversations, mockMessages } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, Calendar, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: String(messages.length + 1),
      senderId: 'current',
      receiverId: selectedConversation.participantId,
      content: newMessage,
      timestamp: new Date(),
      read: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 h-screen">
        <div className="container mx-auto px-4 h-[calc(100vh-4rem)]">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 h-full border-x border-border">
            {/* Conversations List */}
            <div className="md:col-span-1 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                {mockConversations.map((conversation) => (
                  <motion.button
                    key={conversation.id}
                    whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-4 text-left flex items-start gap-3 border-b border-border transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-secondary' : ''
                    }`}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conversation.participantAvatar} />
                      <AvatarFallback>
                        {conversation.participantName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium truncate">{conversation.participantName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true, locale: fr })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge className="h-5 w-5 p-0 justify-center">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </motion.button>
                ))}
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col hidden md:flex">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedConversation.participantAvatar} />
                        <AvatarFallback>
                          {selectedConversation.participantName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConversation.participantName}</h3>
                        <p className="text-xs text-muted-foreground">En ligne</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Réserver
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isCurrentUser = message.senderId === 'current';
                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                isCurrentUser
                                  ? 'bg-primary text-primary-foreground rounded-br-md'
                                  : 'bg-secondary rounded-bl-md'
                              }`}
                            >
                              <p>{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                }`}
                              >
                                {format(message.timestamp, 'HH:mm')}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Input
                        placeholder="Écrivez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button 
                        variant="gradient" 
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Sélectionnez une conversation
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
