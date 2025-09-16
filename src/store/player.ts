import { create } from "zustand";
import type { NowPlayingResponse, nowPlayingItem } from "@/types/play";
import type { station } from "@/types/stations";

export type ChannelMeta = {
  id: string;
  name: string;
  listenUrl: string;
  cover?: string;
};

type PlayerState = {
  channels: ChannelMeta[];
  currentChannelId: string | null;
  nowPlayingByChannel: Record<string, nowPlayingItem | undefined>;
  isLoading: boolean;
  error?: string | null;
};

type PlayerActions = {
  setChannels: (channels: ChannelMeta[]) => void;
  setCurrentChannel: (channelId: string) => void;
  setNowPlaying: (channelId: string, data: nowPlayingItem | undefined) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  clear: () => void;
};

export const usePlayerStore = create<PlayerState & PlayerActions>((set) => ({
  channels: [],
  currentChannelId: null,
  nowPlayingByChannel: {},
  isLoading: false,
  error: null,

  setChannels: (channels) => set({ channels }),
  setCurrentChannel: (channelId) => set({ currentChannelId: channelId }),
  setNowPlaying: (channelId, data) =>
    set((state) => ({ nowPlayingByChannel: { ...state.nowPlayingByChannel, [channelId]: data } })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message) => set({ error: message }),
  clear: () => set({ channels: [], currentChannelId: null, nowPlayingByChannel: {}, isLoading: false, error: null }),
}));


