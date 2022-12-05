import styles from "../styles/Home.module.css";

interface AuthResponse {
  authUrl: string;
}

export default function Home() {
  const handleSignInWithTwitter = async () => {
    const { authUrl }: AuthResponse = await (await fetch("/api/auth")).json();

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
