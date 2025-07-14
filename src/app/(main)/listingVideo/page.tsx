"use client";
import style from "./style.module.css";
import SideBar from "@/app/Components/SideBar/SideBar";
import VideoListGrid, {
  VideoListGridRef,
} from "@/app/Components/VideoListGrid/VideoListGrid";
import { getAllVideos } from "@/app/libs/services/videoServices";
import { useEffect, useState, useRef } from "react";
import { VideoType } from "@/app/types/Video";
import EmptyList from "@/app/Components/EmptyList/EmptyList";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const videoListRef = useRef<VideoListGridRef>(null);

  useEffect(() => {
    // Only fetch initial videos if not currently filtered
    if (!isFiltered) {
      getAllVideos(currentPage, 12, searchText)
        .then((data) => {
          setVideos(data);
        })
        .catch((err) => {
          console.error("Failed to load videos:", err);
          alert("Cannot load videos");
        });
    }
  }, [currentPage, searchText, isFiltered]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterSubmit = (filters: Record<number, string[]>) => {
    setIsFiltered(true);
    if (videoListRef.current) {
      videoListRef.current.handleFilterSubmit(filters);
    }
  };

  const handleGetAll = () => {
    setIsFiltered(false);
    if (videoListRef.current) {
      videoListRef.current.getAllVideos();
    }
  };

  const handleVideosChange = (newVideos: VideoType[]) => {
    setVideos(newVideos);
  };

  return (
    <div className={style.container}>
      <div className={style.mainContent}>
        <SideBar onFilterSubmit={handleFilterSubmit} onGetAll={handleGetAll} />
        <div className={style.videoList}>
          <div className={style.topAction}>
            <input
              type="text"
              placeholder="Search your video"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          {videos.length === 0 ? (
            <EmptyList />
          ) : (
            <>
              <VideoListGrid
                ref={videoListRef}
                videos={videos}
                searchText={searchText}
                onVideosChange={handleVideosChange}
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
