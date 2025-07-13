"use client";
import style from "./style.module.css";
import { VideoType } from "@/app/types/Video";
import { useRouter } from "next/navigation";

type VideoCardProps = Pick<VideoType, "id" | "title" | "duration" | "thumbnail_url" | "tags">;

export default function VideoCard({
    id,
    title,
    duration,
    thumbnail_url,
    tags = [],
}: VideoCardProps) {
    const router = useRouter();

    const handleViewVideo = () => {
        router.push(`/videoDetail/${id}`);
    };

    const safeDuration = typeof duration === "number" ? duration : 0;
    const minutes = Math.floor(safeDuration / 60);
    const seconds = safeDuration % 60;

    return (
        <div
            className={style.videoCardBox}
            style={{
                backgroundImage: `url("/Images/images.png")`,
            }}
            onClick={handleViewVideo}
        >
            <div className={style.videoInfo}>
                <div className={style.tagList}>
                    {Array.isArray(tags) &&
                        tags.map((tag) => (
                            <button key={tag.tag_id} className={style.tag}>
                                {tag.tag_name}
                            </button>
                        ))}
                </div>
                <div className={style.videoTitle}>{title}</div>
                <div className={style.videoAction}>
                    <div>{minutes}m {seconds}s</div>
                    <button className={style.btn}>View Detail</button>
                </div>
            </div>
        </div>
    );
}
