// src/components/PersonalityQuiz.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const PersonalityQuiz = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({
    // Big Five Personality Traits
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50,
    
    // Core Values (weighted more heavily)
    religion: '',
    politicalLeaning: '',
    socialViews: [],
    
    // Additional Preferences
    ageRange: [25, 45],
    location: '',
    educationLevel: '',
  });

  const personalityQuestions = [
    {
      trait: 'openness',
      question: 'I see myself as someone who is open to new experiences and ideas.',
    },
    {
      trait: 'conscientiousness',
      question: 'I see myself as someone who is organized and detail-oriented.',
    },
    {
      trait: 'extraversion',
      question: 'I see myself as someone who is outgoing and sociable.',
    },
    {
      trait: 'agreeableness',
      question: 'I see myself as someone who is compassionate and cooperative.',
    },
    {
      trait: 'neuroticism',
      question: 'I see myself as someone who tends to worry or get anxious.',
    },
  ];

  const handleSliderChange = (trait, value) => {
    setAnswers(prev => ({
      ...prev,
      [trait]: value[0]
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Personality Assessment</h2>
        <p className="text-gray-600">Help us understand you better</p>
      </CardHeader>
      <CardContent>
        {personalityQuestions.map((q, index) => (
          <div key={index} className="mb-8">
            <p className="mb-4">{q.question}</p>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={(value) => handleSliderChange(q.trait, value)}
            />
            <div className="flex justify-between mt-2">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        ))}
        
        <Button 
          onClick={handleSubmit}
          className="w-full mt-6"
        >
          Continue to Values Assessment
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalityQuiz;