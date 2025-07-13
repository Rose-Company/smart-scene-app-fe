"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    };

    return (
        <div className={style.header}>
            <div className={style.logoBox}>
                <Image
                    src="/Images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
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