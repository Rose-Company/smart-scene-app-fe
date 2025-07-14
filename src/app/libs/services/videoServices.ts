import { apiClient } from "../apiClient";
import { VideoType } from "@/app/types/Video";
import { CharacterType } from "@/app/types/Character";
import { SceneType } from "@/app/types/SceneType";
import { FilterPositionType } from "@/app/types/Tag";
export async function getAllVideos(
  page = 1,
  page_size = 10,
  searchText = "",
  filters: Record<number, string[]> = {}
) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const queryParams = new URLSearchParams({
    page: page.toString(),
    page_size: page_size.toString(),
    title: searchText,
  });

  // Add filter parameters using tag_codes only if filters are provided
  const allTagCodes: string[] = [];
  Object.values(filters).forEach((tagIds) => {
    if (tagIds.length > 0) {
      allTagCodes.push(...tagIds);
    }
  });

  if (allTagCodes.length > 0) {
    queryParams.append("tag_codes", allTagCodes.join(","));
  }

  console.log("API call URL:", `/videos?${queryParams}`);

  const res = await apiClient<{
    data: {
      items: VideoType[];
    };
  }>(`/videos?${queryParams}`, "GET", undefined, token);

  return res.data.items ?? [];
}

export async function getVideoById(videoId: string): Promise<VideoType> {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await apiClient<{
    data: VideoType;
  }>(`/videos/${videoId}`, "GET", undefined, token);
  return res.data;
}

export async function getAllCharacters(
  videoId: string,
  page = 1,
  page_size = 10
): Promise<CharacterType[]> {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const queryParams = new URLSearchParams({
    page: page.toString(),
    page_size: page_size.toString(),
  });

  const res = await apiClient<{ data: { items: CharacterType[] } }>(
    `/videos/${videoId}/characters?${queryParams.toString()}`,
    "GET",
    undefined,
    token
  );

  return res.data.items || [];
}

export async function getScenesWithFilter(
  videoId: string,
  include: string[] = [],
  exclude: string[] = [],
  page = 1,
  page_size = 10
): Promise<SceneType[]> {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("page_size", page_size.toString());
  include.forEach((id) => params.append("include_characters", id));
  exclude.forEach((id) => params.append("exclude_characters", id));

  const res = await apiClient<{
    data: {
      items: SceneType[];
    };
  }>(`/videos/${videoId}/scenes?${params.toString()}`, "GET", undefined, token);

  return res.data.items ?? [];
}

export async function getFilterSidebarTags(): Promise<FilterPositionType[]> {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await apiClient<{
    total: number;
    page: number;
    page_size: number;
    extra: unknown;
    items: FilterPositionType[];
  }>("/tags/position/filter_sidebar", "GET", undefined, token);
  return res.items || [];
}
