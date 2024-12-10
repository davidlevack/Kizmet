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

type TraitKey = keyof PersonalityAnswers;

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<PersonalityAnswers>({
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const handleSliderChange = (trait: TraitKey, values: number[]) => {
    setAnswers(prev => ({
      ...prev,
      [trait]: values[0]
    }));
  };

  const traits: Array<{
    key: TraitKey;
    label: string;
    min: string;
    max: string;
  }> = [
    {
      key: 'openness',
      label: 'Openness to Experience',
      min: 'Traditional',
      max: 'Open to new experiences'
    },
    {
      key: 'conscientiousness',
      label: 'Conscientiousness',
      min: 'Flexible',
      max: 'Organized'
    },
    {
      key: 'extraversion',
      label: 'Extraversion',
      min: 'Introverted',
      max: 'Extroverted'
    },
    {
      key: 'agreeableness',
      label: 'Agreeableness',
      min: 'Direct',
      max: 'Empathetic'
    },
    {
      key: 'neuroticism',
      label: 'Emotional Stability',
      min: 'Calm',
      max: 'Sensitive'
    }
  ];

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
            {traits.map(trait => (
              <div key={trait.key} className="space-y-2">
                <label className="font-medium">{trait.label}</label>
                <Slider
                  value={[answers[trait.key]]}
                  onValueChange={(values: readonly number[]) => handleSliderChange(trait.key, values as number[])}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{trait.min}</span>
                  <span>{trait.max}</span>
                </div>
              </div>
            ))}
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