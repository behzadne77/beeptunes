import { NextRequest } from "next/server";

type NowPlaying = {
	channel: string;
	title: string;
	artist: string;
	description: string;
	coverImage: string;
	streamUrl: string;
};

const CHANNELS: Record<string, NowPlaying> = {
	pop: {
		channel: "pop",
		title: "رویای شیرین",
		artist: "Various Artists",
		description: "ترانه‌های پاپ روز",
		coverImage: "/images/beeptunes.svg",
		streamUrl: "https://example.com/streams/pop.m3u8",
	},
	classic: {
		channel: "classic",
		title: "سمفونی نور",
		artist: "ارکستر فیلارمونیک",
		description: "گلچین موسیقی کلاسیک",
		coverImage: "/images/beeptunes.svg",
		streamUrl: "https://example.com/streams/classic.m3u8",
	},
	jazz: {
		channel: "jazz",
		title: "شب‌های جز",
		artist: "Quartet Live",
		description: "اجرای زنده جز",
		coverImage: "/images/beeptunes.svg",
		streamUrl: "https://example.com/streams/jazz.m3u8",
	},
};

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const channelParam = (searchParams.get("channel") || "pop").toLowerCase();
	const data = CHANNELS[channelParam] || CHANNELS.pop;
	return Response.json(data, { status: 200 });
}


