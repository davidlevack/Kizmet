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