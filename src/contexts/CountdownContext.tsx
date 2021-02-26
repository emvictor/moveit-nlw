import { createContext, useEffect, useContext, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
export const CountdownContext = createContext({});

let countdownTimeout: NodeJS.Timeout;

export default function CountdownContextProvider({ children, ...props }) {
  const { setNewChallenge, setHasFinished, counterTime } = useContext(
    ChallengesContext
  );
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(counterTime);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      setNewChallenge();
    }
  }, [isActive, time]);

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(counterTime);
    setHasFinished(false);
  }

  return (
    <CountdownContext.Provider
      value={{ minutes, seconds, isActive, startCountdown, resetCountdown }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
