// components/VideoListGrid/VideoListGrid.tsx
import style from "./style.module.css";
import VideoCard from "@/app/Components/VideoCard/VideoCard";
import { VideoType } from "@/app/types/Video";

type Props = {
    videos: VideoType[];
};

export default function VideoListGrid({ videos }: Props) {
    return (
        <div className={style.container}>
            {videos.map((video, index) => (
                <VideoCard
                    key={index}
                    id={video.id}
                    title={video.title}
                    duration={video.duration}
                    thumbnail_url={video.thumbnail_url}
                    tags={video.tags}
                />
            ))}
        </div>
    );
}
