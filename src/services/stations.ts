import { apiRequest } from "@/lib/http";
import { StationsResponse } from "@/types/stations";

export async function getStations() {
    const result = await apiRequest<StationsResponse>("/stations", {
        query: { 
            limit: 10
        }
    })
    return result
}