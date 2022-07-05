import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AuthChooser from "../components/auth";
import BehaviorCards from "../components/behaviors";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const [isSignedIn, setSignIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    let auth_token = "";
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      auth_token = foundUser.accessToken;
      setUser(foundUser);
    }
    setLoading(true);
    axios
      .get("https://ambiguous-fantastic-andesaurus.glitch.me/behaviors", {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((res) => {
        console.log(res.headers);
        if (res.status !== 401) {
          setSignIn(true);
        }
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>TrackDo</title>
        <meta
          name="description"
          content="A behavior based task management application for Eubrics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">TrackDo</a>
        </h1>

        <p className={styles.description}>
          Get started by choosing any of the behaviors 🏃‍♀️
        </p>

        <div className={styles.grid}>
          {isSignedIn ? <BehaviorCards data={data} /> : <AuthChooser />}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
