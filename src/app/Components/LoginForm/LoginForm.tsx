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
            if (res.user) {
                localStorage.setItem("user", JSON.stringify(res.user));
            }
            document.cookie = `token=${res.token}; path=/; max-age=86400; secure; samesite=strict`;
            if (res.user) {
                document.cookie = `user=${JSON.stringify(res.user)}; path=/; max-age=86400; secure; samesite=strict`;
            }
            window.history.replaceState(null, '', '/listingVideo');
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
