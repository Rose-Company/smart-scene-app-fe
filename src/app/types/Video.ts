import { TagType } from "./Tag"
export type VideoType = {
    id: string;
    title: string;
    thumbnail_url: string;
    duration: string;
    character_count: number;
    status: string;
    file_path: string;
    tags: TagType[];
};