import style from "./style.module.css"
export default function EmptyList() {
    return (
        <div className={style.emptyList}>
            <img className={style.emptyImg} src="/images/emptyList.png"></img>
            <div>No videos found</div>
        </div>
    );
}