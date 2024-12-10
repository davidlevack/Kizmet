// src/utils/matchingAlgorithm.js

const calculatePersonalityCompatibility = (user1, user2) => {
    // Big Five traits comparison - using inverse distance
    const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    
    const personalityScore = traits.reduce((score, trait) => {
      const diff = Math.abs(user1[trait] - user2[trait]);
      return score + (100 - diff) / 100;
    }, 0) / traits.length;
  
    return personalityScore;
  };
  
  const calculateValueAlignment = (user1, user2) => {
    let valueScore = 0;
    const maxScore = 3; // Three main value categories
    
    // Religion compatibility (weighted heavily)
    if (user1.religion === user2.religion) {
      valueScore += 1;
    }
    
    // Political alignment (weighted heavily)
    const politicalDistance = Math.abs(
      politicalSpectrum.indexOf(user1.politicalLeaning) - 
      politicalSpectrum.indexOf(user2.politicalLeaning)
    );
    valueScore += (1 - politicalDistance / politicalSpectrum.length);
    
    // Social views comparison
    const commonViews = user1.socialViews.filter(view => 
      user2.socialViews.includes(view)
    ).length;
    valueScore += commonViews / Math.max(user1.socialViews.length, user2.socialViews.length);
    
    return valueScore / maxScore;
  };
  
  const findMatches = (currentUser, potentialMatches) => {
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
  
  export { findMatches, calculatePersonalityCompatibility, calculateValueAlignment };