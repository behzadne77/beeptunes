import type { station, song } from "./stations";

export type playingItem = {
    duration: number;
    played_at: number;
    song: song;
    elapsed: number;
    remaining: number;
}
export type nowPlayingItem = {
    station: station;
    now_playing: playingItem;
    playing_next:playingItem; 
}
export type NowPlayingResponse = nowPlayingItem[]