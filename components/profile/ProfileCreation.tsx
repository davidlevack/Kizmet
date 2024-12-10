import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ProfileCreation = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    bio: ''
  });

  const handleChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <Input
            type="number"
            value={profile.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <Input
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="w-full"
          />
        </div>

        <Button className="w-full">Save Profile</Button>
      </div>
    </Card>
  );
};

export default ProfileCreation;