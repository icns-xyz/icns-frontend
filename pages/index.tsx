import styles from "../styles/Home.module.css";

export default function Home() {
  const handleSigninWithTwitter = async () => {
    const { authUrl } = await (await fetch("/api/auth")).json();

    window.open(authUrl);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleSigninWithTwitter}>Sign in with Twitter</button>
    </div>
  );
}
