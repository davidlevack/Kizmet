import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, X, MessageCircle } from 'lucide-react';

const MatchCard = ({ match }) => {
  // Providing default props to ensure component can run without required props
  match = match || {
    photos: ["/api/placeholder/400/320"],
    displayName: "Sarah",
    age: 28,
    location: "New York",
    compatibilityScore: 85,
    personalityType: "INFJ",
    bio: "Love hiking, photography, and trying new restaurants.",
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <div className="relative">
        <img
          src={match.photos[0]}
          alt={match.displayName}
          className="w-full h-80 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
          <h3 className="text-xl font-bold text-white">
            {match.displayName}, {match.age}
          </h3>
          <p className="text-white/80">{match.location}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {Math.round(match.compatibilityScore)}% Match
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {match.personalityType}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{match.bio}</p>

        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <X className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const MatchList = () => {
  // Sample data
  const matches = [
    {
      id: 1,
      photos: ["/api/placeholder/400/320"],
      displayName: "Sarah",
      age: 28,
      location: "New York",
      compatibilityScore: 85,
      personalityType: "INFJ",
      bio: "Love hiking, photography, and trying new restaurants.",
    },
    {
      id: 2,
      photos: ["/api/placeholder/400/320"],
      displayName: "Michael",
      age: 30,
      location: "San Francisco",
      compatibilityScore: 82,
      personalityType: "ENTP",
      bio: "Software engineer by day, musician by night.",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;