
const channelsPerisanNames = [
    {
        key: "radio_beeptunes",
        value: "رادیو بیپ تونز"
    },
    {
        key: "pop",
        value: "رادیو پاپ"
    },
    {
        key: "instrumental",
        value: "رادیو آرامش"
    },
    {
        key: "persian_classics",
        value: "رادیو سرخوش"
    },
    {
        key: "upbeats",
        value: "رادیو اوج"
    },
    {
        key: "folk_musics",
        value: "رادیو محلی"
    },
    {
        key: "fusionـmusic",
        value: "رادیو آونگ"
    },
    {
        key: "classic",
        value: "رادیو هارمونی"
    }
]
export function channelsPerisanConvert(channel_shortcode: string) {
    const find = channelsPerisanNames.find(item=> item.key == channel_shortcode)
    return find?.value || null;
}