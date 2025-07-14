"use client";
import style from "./style.module.css";
import SideBar from "@/app/Components/SideBar/SideBar";
import VideoListGrid from "@/app/Components/VideoListGrid/VideoListGrid";
import { getAllVideos } from "@/app/libs/services/videoServices";
import { useEffect, useState } from "react";
import { VideoType } from "@/app/types/Video"
import EmptyList from "@/app/Components/EmptyList/EmptyList";
export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState<VideoType[]>([]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        getAllVideos(currentPage, 12, searchText)
            .then((data) => {
                setVideos(data);
            })
            .catch((err) => {
                alert("Cannot load videos");
            });
    }, [currentPage, searchText]);
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={style.container}>
            <div className={style.mainContent}>
                <SideBar />
                <div className={style.videoList}>
                    <div className={style.topAction}>
                        <input type="text" placeholder="Search your video"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setCurrentPage(1);
                            }
                            } />
                    </div>
                    {videos.length === 0 ? (
                        <EmptyList />
                    ) : (
                        <>
                            <VideoListGrid
                                videos={videos}
                            />

                        </>
                    )}
                    <div className={style.paging}>
                        <button
                            className={style.pagingBtn}
                            onClick={() => handlePageClick(currentPage - 1)}
                            disabled={currentPage <= 1}
                        >
                            Previous
                        </button>
                        <div className={style.currentPageBox}>Page {currentPage}</div>
                        <button
                            className={style.pagingBtn}
                            onClick={() => handlePageClick(currentPage + 1)}
                            disabled={videos.length < 12}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
