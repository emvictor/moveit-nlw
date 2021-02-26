import { createContext, useState, useEffect } from "react";
import challenges from "../../challenges.json";

export const ChallengesContext = createContext({});

export default function ChallengesProvider({ children, ...props }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [hasFinished, setHasFinished] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const counterTime = 0.05 * 60;
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function setNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        hasFinished,
        activeChallenge,
        experienceToNextLevel,
        counterTime,
        completeChallenge,
        setHasFinished,
        resetChallenge,
        setNewChallenge,
        levelUp,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
