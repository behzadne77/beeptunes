export type station = {
    id: number;
    name: string;
    shortcode: string;
    description: string;
    frontend: string;
    listen_url: string;
}
export type StationsResponse = station[]

export type song = {
    id: string;
    art: string;
    text: string;
    artist: string;
    title: string;
    album: string;
    genre: string;
    duration: number;
}