"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import { login } from "@/app/libs/services/authServices";
export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const res = await login(username, password);
            localStorage.setItem("accessToken", res.token);
            router.push("/listingVideo");
        } catch (err) {
            alert("Login failed. Please try again.");
            console.error(err);
        }
    };
    return (
        <div className={styles.loginBox}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.loginBtn} onClick={handleLogin}>
                Log In
            </button>
        </div>
    );
}
