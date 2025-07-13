"use client";
import { useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/navigation"
export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const handleLogout = () => {
        router.push('/');
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
                            <button className={`${style.dropdownItem}`} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay to close dropdown when clicking outside */}
            {isDropdownOpen && (
                <div
                    className={style.overlay}
                    onClick={() => setIsDropdownOpen(false)}
                ></div>
            )}
        </div>
    );
}