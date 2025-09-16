import { create } from "zustand";
import type { NowPlayingResponse, nowPlayingItem } from "@/types/play";
import { station } from "@/types/stations";

export type ChannelMeta = {
  id: number;
  name: string;
  listenUrl: string;
  cover?: string;
};

type PlayerState = {
  channels: station[];
  currentChannelId: number | null;
  nowPlayingByChannel: nowPlayingItem | undefined;
  isLoading: boolean;
  isPlaying: boolean;
  error?: string | null;
};

type PlayerActions = {
  setChannels: (channels: station[]) => void;
  setCurrentChannel: (channelId: number) => void;
  setNowPlaying: (data: nowPlayingItem | undefined) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  clear: () => void;
  setIsPlaying: (isPlaying: boolean) => void 
};

export const usePlayerStore = create<PlayerState & PlayerActions>((set) => ({
  channels: [],
  currentChannelId: null,
  nowPlayingByChannel: undefined,
  isLoading: false,
  error: null,
  isPlaying: false,

  setChannels: (channels) => set({ channels }),
  setCurrentChannel: (channelId) => set({ currentChannelId: channelId }),
  setNowPlaying: (data) => set({ nowPlayingByChannel: data  }),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message) => set({ error: message }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  clear: () => set({ channels: [], currentChannelId: null, nowPlayingByChannel: undefined, isLoading: false, error: null, isPlaying: false }),
}));


