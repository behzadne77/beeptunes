import { QueryClient, useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/services/nowPlaying";
import type { NowPlayingResponse } from "@/types/play";

export const nowPlayingKey = ["nowPlaying"] as const;

export function useNowPlaying(options?: {
  refetchInterval?: number;
  enabled?: boolean;
}) {
  return useQuery<NowPlayingResponse>({
    queryKey: nowPlayingKey,
    queryFn: () => getNowPlaying(),
    refetchInterval: options?.refetchInterval ?? 30_000,
    enabled: options?.enabled ?? true,
  });
}

export async function fetchNowPlaying(
  queryClient: QueryClient
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: nowPlayingKey,
    queryFn: () => getNowPlaying(),
  });
}


