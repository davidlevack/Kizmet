// src/utils/matchingAlgorithm.js

interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

interface User {
  personalityTraits: PersonalityTraits;
  interests?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  religion?: string;
  politicalLeaning?: string;
  socialViews: string[];
}

const politicalSpectrum = [
  'far-left',
  'left',
  'center-left',
  'center',
  'center-right',
  'right',
  'far-right'
] as const;

type PoliticalLeaning = typeof politicalSpectrum[number];

const calculatePersonalityCompatibility = (user1: User, user2: User): number => {
  // Big Five traits comparison - using inverse distance
  const traits: (keyof PersonalityTraits)[] = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  
  let totalDifference = 0;
  let maxPossibleDifference = 100 * traits.length; // Assuming each trait is scored 0-100

  traits.forEach(trait => {
    const difference = Math.abs(
      user1.personalityTraits[trait] - user2.personalityTraits[trait]
    );
    totalDifference += difference;
  });

  // Convert to a similarity score (0-1)
  const similarityScore = 1 - (totalDifference / maxPossibleDifference);
  
  return similarityScore;
};
  
const calculateValueAlignment = (user1: User, user2: User): number => {
  let valueScore = 0;
  const maxScore = 3; // Three main value categories
  
  // Religion compatibility (weighted heavily)
  if (user1.religion === user2.religion) {
    valueScore += 1;
  }
  
  // Political alignment (weighted heavily)
  if (user1.politicalLeaning && user2.politicalLeaning) {
    const politicalDistance = Math.abs(
      politicalSpectrum.indexOf(user1.politicalLeaning as PoliticalLeaning) - 
      politicalSpectrum.indexOf(user2.politicalLeaning as PoliticalLeaning)
    );
    valueScore += (1 - politicalDistance / politicalSpectrum.length);
  }
  
  // Social views comparison
  const commonViews = user1.socialViews.filter(view => 
    user2.socialViews.includes(view)
  ).length;
  valueScore += commonViews / Math.max(user1.socialViews.length, user2.socialViews.length);
  
  return valueScore / maxScore;
};

const findMatches = (currentUser: User, potentialMatches: User[]): (User & { compatibilityScore: number })[] => {
  const PERSONALITY_WEIGHT = 0.4;
  const VALUES_WEIGHT = 0.6;
  
  return potentialMatches
    .map(match => {
      const personalityScore = calculatePersonalityCompatibility(currentUser, match);
      const valueScore = calculateValueAlignment(currentUser, match);
      
      const totalScore = (personalityScore * PERSONALITY_WEIGHT) + 
                        (valueScore * VALUES_WEIGHT);
      
      return {
        ...match,
        compatibilityScore: totalScore * 100
      };
    })
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};
  
export { 
  findMatches, 
  calculatePersonalityCompatibility, 
  calculateValueAlignment,
  type User,
  type PersonalityTraits,
  type PoliticalLeaning
};