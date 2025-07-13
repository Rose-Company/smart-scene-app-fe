"use client";
import style from "./style.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CharacterList from "@/app/Components/CharacterList/CharacterList";
import VideoWrap from "@/app/Components/VideoWrap/VideoWrap";

import { getVideoById, getAllCharacters, getScenesWithFilter } from "@/app/libs/services/videoServices";
import { VideoType } from "@/app/types/Video";
import { CharacterType } from "@/app/types/Character";

function timeStrToSeconds(str: string): number {
    const [hh, mm, ss] = str.split(":").map(Number);
    return hh * 3600 + mm * 60 + ss;
}

export default function VideoDetail() {
    const pathname = usePathname();
    const videoId = pathname.split("/")[2];

    const [video, setVideo] = useState<VideoType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [includedIds, setIncludedIds] = useState<string[]>([]);
    const [excludedIds, setExcludedIds] = useState<string[]>([]);
    const [scenes, setScenes] = useState<any[]>([]);
    const [showIncluded, setShowIncluded] = useState(false);
    const [showExcluded, setShowExcluded] = useState(false);
    const [isFilterScenes, setIsFilterScenes] = useState(false);

    // Fetch video + characters
    useEffect(() => {
        if (!videoId) return;

        const fetchVideoAndCharacters = async () => {
            try {
                const videoData = await getVideoById(videoId);
                const characterData = await getAllCharacters(videoId, 1, 100);
                setVideo(videoData);
                setCharacters(characterData);
            } catch {
                setError("Không thể tải video hoặc nhân vật.");
            }
        };

        fetchVideoAndCharacters();
    }, [videoId]);

    // Fetch scenes when filter changes
    useEffect(() => {
        if (!isFilterScenes) return;
        const fetchScenes = async () => {
            try {
                console.log("📥 Đang gọi API getScenesWithFilter với:", {
                    videoId,
                    includedIds,
                    excludedIds
                });
                const sceneData = await getScenesWithFilter(videoId, includedIds, excludedIds, 1, 100);
                const parsed = sceneData.map((s: any) => ({
                    ...s,
                    start_time: typeof s.start_time === "string" ? timeStrToSeconds(s.start_time) : s.start_time,
                    end_time: typeof s.end_time === "string" ? timeStrToSeconds(s.end_time) : s.end_time
                }));

                setScenes(parsed);
            } catch (err) {
                console.error("Lỗi khi tải scenes:", err);
            } finally {

            }
        };

        fetchScenes();
    }, [includedIds, excludedIds, videoId, isFilterScenes]);


    return (
        <div className={style.mainContainer}>
            {video ? (
                <div className={style.videoContent}>
                    <div className={style.breadcrumb}>
                        <span className={style.crumb}><a href="/listingVideo">Home</a></span>
                        <span className={style.separator}>/</span>
                        <span className={style.crumb}>{video.title}</span>
                    </div>

                    <VideoWrap
                        key={video.file_path}
                        thumbnail_url={video.thumbnail_url}
                        file_path={video.file_path}
                        scenes={scenes}
                    />
                </div>
            ) : (
                <div />
            )}

            <div className={style.videoFilter}>
                <div className={style.videoTitle}>{video?.title}</div>
                {error && <div style={{ color: "red" }}>{error}</div>}

                {/* Include Characters */}
                <div className={style.filterGroup}>
                    <div
                        className={style.filterHeader}
                        onClick={() => setShowIncluded(!showIncluded)}
                    >
                        <span>Included Characters</span>
                        <span className={style.toggleIcon}>{showIncluded ? "▲" : "▼"}</span>
                    </div>
                    {showIncluded && (
                        <>
                            <div className={style.selectedInfo}>
                                Selected {includedIds.length} characters
                            </div>
                            <CharacterList
                                characters={characters}
                                onSelectChange={(ids) => {
                                    if (JSON.stringify(ids) !== JSON.stringify(includedIds)) {
                                        setIncludedIds(ids);
                                        setIsFilterScenes(true);
                                    }
                                }}
                            />
                        </>
                    )}
                </div>

                {/* Exclude Characters */}
                <div className={style.filterGroup}>
                    <div
                        className={style.filterHeader}
                        onClick={() => setShowExcluded(!showExcluded)}
                    >
                        <span>Excluded Characters</span>
                        <span className={style.toggleIcon}>{showExcluded ? "▲" : "▼"}</span>
                    </div>
                    {showExcluded && (
                        <>
                            <div className={style.selectedInfo}>
                                Selected {excludedIds.length} characters
                            </div>
                            <CharacterList
                                characters={characters}
                                onSelectChange={(ids) => {
                                    if (JSON.stringify(ids) !== JSON.stringify(excludedIds)) {
                                        setExcludedIds(ids);
                                        setIsFilterScenes(true);
                                    }
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
