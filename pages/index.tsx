import styles from "../styles/Home.module.css";
import { useEffect } from "react";

interface AuthResponse {
  authUrl: string;
}

export default function Home() {
  const handleSignInWithTwitter = async () => {
    const response: AuthResponse = await (await fetch("/api/auth")).json();

    window.location.href = response.authUrl;
  };

  return (
    <div className={styles.container}>
      <div>
        <button onClick={handleSignInWithTwitter}>Sign in with Twitter</button>
      </div>
    </div>
  );
}
