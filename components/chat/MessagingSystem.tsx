Great, let's create the match display interface next.



```tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, X, MessageCircle } from 'lucide-react';

const MatchList = () => {
  // Sample data - in production this would come from props or API
  const matches = [
    {
      id: 1,
      displayName: "Sarah",
      age: 28,
      location: "New York",
      compatibilityScore: 85,
      personalityType: "INFJ",
      bio: "Photography enthusiast and coffee lover. Looking for someone to explore the city with.",
    },
    {
      id: 2,
      displayName: "Michael",
      age: 30,
      location: "San Francisco",
      compatibilityScore: 82,
      personalityType: "ENTP",
      bio: "Software engineer who loves outdoor adventures and trying new restaurants.",
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="overflow-hidden">
            <div className="relative">
              <img
                src="/api/placeholder/400/320"
                alt={`${match.displayName}'s profile`}
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <h3 className="text-xl font-bold text-white">
                  {match.displayName}, {match.age}
                </h3>
                <p className="text-white/80">{match.location}</p>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {match.compatibilityScore}% Match
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {match.personalityType}
                </span>
              </div>

              <p className="text-gray-700">{match.bio}</p>

              <div className="flex justify-center gap-4 pt-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4 text-green-500" />
                </Button>
                
                <Button variant="outline" size="icon" className="rounded-full">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchList;

```

Now let's create the messaging system component.



```tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Circle } from 'lucide-react';

const MessagingSystem = () => {
  const [message, setMessage] = useState('');
  
  // Sample conversation data - would come from props/API in production
  const conversations = [
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
  ];

  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  const sendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
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
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                activeConversation.id === conv.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="/api/placeholder/40/40"
                    alt={conv.name}
                    className="w-10 h-10 rounded-full"
                  />
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
            <img
              src="/api/placeholder/40/40"
              alt={activeConversation.name}
              className="w-10 h-10 rounded-full"
            />
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
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
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
```


