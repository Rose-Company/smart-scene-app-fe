"use client";
import { useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation"
export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.history.replaceState(null, '', '/');
        window.location.href = "/";
    };
    const handleReturnHome = () => {
        router.push('/listingVideo');
    }
    return (
        <div className={style.header}>
            <div className={style.logoBox} onClick={handleReturnHome}>
                <img
                    src="/Images/logo.png"
                    alt="logo"
                    className={style.logo}
                />
                <div className={style.logoTitle}>Smart Scene</div>
            </div>

            <div className={style.profileBox}>
                <div className={style.avatarContainer}>
                    <img
                        src="/Images/user.png"
                        alt="avatar"
                        className={style.avatar}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />

                    {isDropdownOpen && (
                        <div className={style.dropdown}>
                            <button className={style.dropdownItem} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {isDropdownOpen && (
                <div
                    className={style.overlay}
                    onClick={() => setIsDropdownOpen(false)}
                ></div>
            )}
        </div>
    );
}