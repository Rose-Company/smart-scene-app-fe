import { VideoType } from "@/app/types/Video";
import { useRef, useState } from "react";
import style from "./style.module.css";

type Scene = {
    scene_id: string;
    start_time: number;
    end_time: number;
};

type VideoProps = Pick<VideoType, "thumbnail_url" | "file_path"> & {
    scenes?: Scene[];
};

export default function VideoWrap({ thumbnail_url, file_path, scenes }: VideoProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const togglePlay = () => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        if (videoEl.paused) {
            videoEl.play();
            setIsPlaying(true);
        } else {
            videoEl.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        const videoEl = videoRef.current;
        if (!videoEl) return;
        setCurrentTime(videoEl.currentTime);
    };

    const handleLoadedMetadata = () => {
        const videoEl = videoRef.current;
        if (!videoEl) return;
        setDuration(videoEl.duration);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const videoEl = videoRef.current;
        const value = parseFloat(e.target.value);
        if (videoEl) {
            videoEl.currentTime = value;
            setCurrentTime(value);
        }
    };

    // Thêm function để jump tới scene
    const jumpToScene = (scene: Scene) => {
        const videoEl = videoRef.current;
        if (videoEl) {
            videoEl.currentTime = scene.start_time;
            setCurrentTime(scene.start_time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const isCurrentTimeInScene = (scene: Scene) => {
        return currentTime >= scene.start_time && currentTime <= scene.end_time;
    };

    return (
        <div className={style.videoWrap}>
            <video
                ref={videoRef}
                src={file_path}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />

            <div className={style.controls}>
                <button onClick={togglePlay} className={style.playButton}>
                    <img
                        src={isPlaying ? "/Images/pause.png" : "/Images/play.png"}
                        alt={isPlaying ? "Pause" : "Play"}
                        className={style.icon}
                    />
                </button>

                <div className={style.rangeWrapper}>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        step="0.05"
                        value={currentTime}
                        onChange={handleSeek}
                    />

                    <div className={style.progressHighlight}>
                        {duration > 0 && scenes?.map((scene) => {
                            const left = (scene.start_time / duration) * 100;
                            const width = ((scene.end_time - scene.start_time) / duration) * 100;
                            const isActive = isCurrentTimeInScene(scene);

                            return (
                                <div
                                    key={scene.scene_id}
                                    className={`${style.highlightSegment} ${isActive ? style.activeSegment : ''}`}
                                    style={{
                                        left: `${left}%`,
                                        width: `${width}%`
                                    }}
                                    onClick={() => jumpToScene(scene)}
                                    title={`Scene ${scene.scene_id}: ${formatTime(scene.start_time)} - ${formatTime(scene.end_time)}`}
                                />
                            );
                        })}
                    </div>
                </div>

                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            {scenes && scenes.length > 0 && (
                <div className={style.sceneList}>
                    <h4>Scenes:</h4>
                    {scenes.map((scene, index) => (
                        <div
                            key={scene.scene_id}
                            className={`${style.sceneItem} ${isCurrentTimeInScene(scene) ? style.activeScene : ''}`}
                            onClick={() => jumpToScene(scene)}
                        >
                            Scene {index + 1}: {formatTime(scene.start_time)} - {formatTime(scene.end_time)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}