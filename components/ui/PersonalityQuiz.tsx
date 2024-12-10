// src/components/PersonalityQuiz.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface PersonalityAnswers {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

interface PersonalityQuizProps {
  onSubmit: (answers: PersonalityAnswers) => void;
}

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<PersonalityAnswers>({
    // Big Five Personality Traits
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const handleSliderChange = (trait: keyof PersonalityAnswers, value: number[]) => {
    setAnswers(prev => ({
      ...prev,
      [trait]: value[0]
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Personality Assessment</h2>
        <p className="text-center text-muted-foreground">
          Move the sliders to indicate where you fall on each trait spectrum
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-medium">Openness to Experience</label>
              <Slider
                value={[answers.openness]}
                onValueChange={(value) => handleSliderChange('openness', value)}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Traditional</span>
                <span>Open to new experiences</span>
              </div>
            </div>

            {/* Repeat for other traits */}
            {/* ... */}

          </div>

          <Button type="submit" className="w-full">
            Submit Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalityQuiz;