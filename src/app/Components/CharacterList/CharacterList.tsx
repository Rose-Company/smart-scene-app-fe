import { useEffect, useState } from "react";
import { CharacterType } from "@/app/types/Character";
import CharacterCard from "../CharacterCard/CharacterCard";
import style from "./style.module.css";

interface Props {
    characters: CharacterType[];
    onSelectChange?: (ids: string[]) => void;
}

export default function CharacterList({ characters, onSelectChange }: Props) {
    const [selectedCharacterIds, setSelectedCharacterIds] = useState<string[]>([]);

    const handleClick = (id: string) => {
        setSelectedCharacterIds((prev) => {
            if (prev.includes(id)) {
                // Nếu đã chọn rồi thì bỏ chọn
                return prev.filter((item) => item !== id);
            } else {
                // Nếu chưa chọn thì thêm vào
                return [...prev, id];
            }
        });
    };

    useEffect(() => {
        onSelectChange?.(selectedCharacterIds);
    }, [selectedCharacterIds, onSelectChange]);

    return (
        <div>
            <div className={style.characterList}>
                {characters.map((char) => (
                    <CharacterCard
                        key={char.character_id}
                        name={char.character_name}
                        selected={selectedCharacterIds.includes(char.character_id)}
                        onClick={() => handleClick(char.character_id)}
                    />
                ))}
            </div>
        </div>
    );
}
