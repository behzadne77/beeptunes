import { apiRequest } from "@/lib/http";
import { NowPlayingResponse } from "@/types/play";

export async function getNowPlaying () {
    const result = await apiRequest<NowPlayingResponse>("/nowplaying")
    return result;
}