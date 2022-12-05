import styles from "../styles/Home.module.css";
import { TwitterAuthUrlResponse } from "../types/api-response";

export default function Home() {
  const handleSignInWithTwitter = async () => {
    const { authUrl }: TwitterAuthUrlResponse = await (
      await fetch("/api/twitter-auth-url")
    ).json();

    window.location.href = authUrl;
  };

  return (
    <div className={styles.container}>
      <div>
        <button onClick={handleSignInWithTwitter}>Sign in with Twitter</button>
      </div>
    </div>
  );
}
