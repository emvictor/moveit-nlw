import styles from "../styles/components/Profile.module.scss";
import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";

export default function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/emvictor.png"
        alt="My Profile at GitHub"
        className={styles.profilePicture}
      />
      <div>
        <strong> Victor Santos </strong>
        <p>
          <img src="icons/level.svg" alt="Level arrow" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
