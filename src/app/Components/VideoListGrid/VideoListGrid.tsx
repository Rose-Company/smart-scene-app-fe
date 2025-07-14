"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { getAllVideos } from "@/app/libs/services/videoServices";
import style from "./style.module.css";
import VideoCard from "@/app/Components/VideoCard/VideoCard";
import { VideoType } from "@/app/types/Video";

type Props = {
  videos: VideoType[];
  searchText?: string;
  onVideosChange?: (videos: VideoType[]) => void;
};

export interface VideoListGridRef {
  handleFilterSubmit: (filters: Record<number, string[]>) => Promise<void>;
  clearFilters: () => Promise<void>;
  getAllVideos: () => Promise<void>;
}

const VideoListGrid = forwardRef<VideoListGridRef, Props>(
  ({ videos: initialVideos, searchText = "", onVideosChange }, ref) => {
    const [videos, setVideos] = useState<VideoType[]>(initialVideos);
    const [loading, setLoading] = useState(false);
    const [currentFilters, setCurrentFilters] = useState<
      Record<number, string[]>
    >({});

    useEffect(() => {
      setVideos(initialVideos);
    }, [initialVideos]);

    const getAllVideosFunc = async () => {
      setLoading(true);
      setCurrentFilters({});

      try {
        // Always fetch fresh data from API, don't rely on initialVideos
        const allVideos = await getAllVideos(1, 12, searchText, {});
        setVideos(allVideos);
        if (onVideosChange) {
          onVideosChange(allVideos);
        }
      } catch (error) {
        console.error("Failed to fetch all videos:", error);
        // Don't fallback to initialVideos, keep current state
      } finally {
        setLoading(false);
      }
    };

    const handleFilterSubmit = async (filters: Record<number, string[]>) => {
      setLoading(true);
      setCurrentFilters(filters);

      try {
        const filteredVideos = await getAllVideos(1, 12, searchText, filters);
        setVideos(filteredVideos);
        if (onVideosChange) {
          onVideosChange(filteredVideos);
        }
      } catch (error) {
        console.error("Failed to fetch filtered videos:", error);
        // Don't fallback to initialVideos, keep current state
      } finally {
        setLoading(false);
      }
    };

    const clearFilters = async () => {
      setLoading(true);
      setCurrentFilters({});

      try {
        const allVideos = await getAllVideos(1, 12, searchText, {});
        setVideos(allVideos);
        if (onVideosChange) {
          onVideosChange(allVideos);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        // Don't fallback to initialVideos, keep current state
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      handleFilterSubmit,
      clearFilters,
      getAllVideos: getAllVideosFunc,
    }));

    if (loading) {
      return (
        <div className={style.container}>
          <div className={style.loading}>Loading videos...</div>
        </div>
      );
    }

    return (
      <div className={style.container}>
        {videos.length === 0 ? (
          <div className={style.emptyState}>
            {Object.keys(currentFilters).length > 0
              ? "No videos match your current filters. Try adjusting your selection."
              : "No videos found."}
          </div>
        ) : (
          videos.map((video, index) => (
            <VideoCard
              key={index}
              id={video.id}
              title={video.title}
              duration={video.duration}
              thumbnail_url={video.thumbnail_url}
              tags={video.tags}
            />
          ))
        )}
      </div>
    );
  }
);

VideoListGrid.displayName = "VideoListGrid";

export default VideoListGrid;
