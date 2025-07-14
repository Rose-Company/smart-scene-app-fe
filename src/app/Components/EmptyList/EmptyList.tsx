import style from "./style.module.css"
export default function EmptyList() {
    return (
        <div className={style.emptyList}>
            <div>No videos found</div>
        </div>
    );
}