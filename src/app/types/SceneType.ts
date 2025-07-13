export type SceneType = {
    video_id: string;
    scene_id: string;
    start_time: number;
    end_time: number;
    duration: number;
    start_time_formatted: string;
    end_time_formatted: string;
    character_count: number;
    characters: {
        character_id: string;
        character_name: string;
        character_avatar: string;
        confidence: number;
        start_time: number;
        end_time: number;
    }[];
};
