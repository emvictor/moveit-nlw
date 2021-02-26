import { useContext } from "react";
import styles from "../styles/components/ChallengeBox.module.scss";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
export default function ChallengeBox() {
  const {
    activeChallenge,
    resetChallenge,
    isActive,
    completeChallenge,
  } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  const hasActiveCycle = false;

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }
  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {isActive ? (
        <div className={styles.activeCycle}>
          <strong>Complete este ciclo para receber desafios.</strong>
          <p>
            <img src="icons/level-up.svg" alt="" />
            Complete os desafios e suba de nível.
          </p>
        </div>
      ) : (
        <>
          {activeChallenge ? (
            <div className={styles.challengeActive}>
              <header>Ganhe {activeChallenge.amount} xp</header>
              <main>
                <img
                  src={`icons/${activeChallenge.type}.svg`}
                  alt="Type of activity"
                />
                <strong>Novo desafio.</strong>
                <p>{activeChallenge.description}</p>
              </main>
              <footer>
                <button
                  type="button"
                  className={styles.challengeFailedButton}
                  onClick={handleChallengeFailed}
                >
                  Falhei :(
                </button>
                <button
                  type="button"
                  className={styles.challengeSucceededButton}
                  onClick={handleChallengeSucceeded}
                >
                  Completei :)
                </button>
              </footer>
            </div>
          ) : (
            <div className={styles.challengeNotActive}>
              <strong>Inicie um ciclo para receber desafios</strong>

              <p>
                <img
                  src="icons/level-up.svg"
                  alt="Green arrow pointing up as you level up"
                />
                Avance de nível completando desafios.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
