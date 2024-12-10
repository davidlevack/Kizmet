"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Circle } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  isSender: boolean;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  isOnline: boolean;
  messages: Message[];
}

const AVATAR_PATH = "/placeholder-avatar.jpg";

const MessagingSystem = () => {
  const [message, setMessage] = useState('');
  
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Sarah",
      lastMessage: "That sounds great! When are you free?",
      isOnline: true,
      messages: [
        { id: 1, text: "Hi! I saw we matched!", isSender: false, time: "2:30 PM" },
        { id: 2, text: "Hey! Yes, I'd love to chat!", isSender: true, time: "2:32 PM" },
        { id: 3, text: "That sounds great! When are you free?", isSender: false, time: "2:33 PM" }
      ]
    },
    {
      id: 2,
      name: "Michael",
      lastMessage: "Looking forward to meeting up!",
      isOnline: false,
      messages: []
    }
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation>(conversations[0]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        isSender: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      // Handle sending message
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen max-h-screen">
      {/* Conversation List */}
      <div className="w-80 border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveConversation(conv);
                }
              }}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                activeConversation.id === conv.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="relative w-10 h-10">
                    <Image
                      src={AVATAR_PATH}
                      alt={conv.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  {conv.isOnline && (
                    <Circle className="w-3 h-3 absolute bottom-0 right-0 text-green-500 fill-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{conv.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10">
              <Image
                src={AVATAR_PATH}
                alt={activeConversation.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{activeConversation.name}</h3>
              <span className="text-sm text-gray-500">
                {activeConversation.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeConversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-sm p-3 rounded-lg ${
                  msg.isSender
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-xs ${
                    msg.isSender ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
