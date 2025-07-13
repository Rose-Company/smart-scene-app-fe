import style from "./style.module.css";

interface Props {
    name: string;
    avatar: string;
    selected: boolean;
    onClick?: () => void;
}

export default function CharacterCard({ name, avatar, selected, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className={style.characterCard}
            style={{
                backgroundImage: `url(${avatar})`,
                border: selected ? "3px solid #d4f546" : "1px solid #ccc",
            }}
        >
            <div className={style.overlay}>
                <div className={style.characterName}>{name}</div>
            </div>
        </div>
    );
}
