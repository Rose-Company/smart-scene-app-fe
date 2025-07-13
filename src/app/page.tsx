"use client";
import { useState } from "react";
import styles from "./style.module.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import Image from "next/image";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.heading}>See Who's in the Scene</h1>
        <p className={styles.subheading}>
          Our AI-powered platform automatically detects and identifies people
          in every scene — making your video smarter, searchable, and interactive.
        </p>

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <span>🧠</span>
            <p>AI Face Recognition</p>
          </div>
          <div className={styles.featureItem}>
            <span>🎥</span>
            <p>Scene-by-Scene Detection</p>
          </div>
          <div className={styles.featureItem}>
            <span>✨</span>
            <p>Instant Character Tags</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <LoginForm />
      </div>
    </section>
  );
}
