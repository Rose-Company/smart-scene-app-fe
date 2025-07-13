"use client";
import { useState } from "react";
import style from "./style.module.css";

export default function SideBar() {
    const [show, setShow] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);

    const categories = [
        "Logos",
        "Typography & Titles",
        "Slideshows",
        "Lower Thirds",
        "Intros",
        "Infographics",
        "Transitions",
        "Mockups",
        "Tools",
        "Animated Letters",
        "Overlays & Icons",
    ];

    const toggleCategory = (category: string) => {
        setSelected((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    return (
        <div className={style.sidebar}>
            <div className={style.header} onClick={() => setShow(!show)}>
                <span>Filters</span>
                <span>{show ? "▾" : "▸"}</span>
            </div>

            {show && (
                <div className={style.categoryBlock}>
                    <div className={style.categoryHeader}>
                        Categories <span className={style.arrow}>▾</span>
                    </div>
                    <div className={style.categoryList}>
                        {categories.map((cat) => (
                            <label key={cat} className={style.categoryItem}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                                <span>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
