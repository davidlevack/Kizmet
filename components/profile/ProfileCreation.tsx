"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ProfileData {
  name: string;
  age: string;
  location: string;
  bio: string;
  interests: string[];
  [key: string]: string | string[]; // Index signature for dynamic field access
}

const ProfileCreation = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    age: '',
    location: '',
    bio: '',
    interests: []
  });

  const handleChange = (field: keyof ProfileData, value: string | string[]) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      // Handle successful profile creation
    } catch (error) {
      console.error('Profile creation failed:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create Your Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Age
            </label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              onChange={(e) => handleChange('age', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location
            </label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Bio
            </label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="interests" className="block text-sm font-medium mb-2">
              Interests
            </label>
            <Input
              id="interests"
              value={profile.interests.join(', ')}
              onChange={(e) => handleChange('interests', e.target.value.split(','))}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Save Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileCreation;