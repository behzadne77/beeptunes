"use client"
import GlassButton from "./GlassButton";
import { usePlayerStore } from "@/store/player";
import { ListMusic, MoveUpLeft } from "lucide-react";
import {Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose} from "@/components/ui/drawer"
import { channelsPerisanConvert } from "@/lib/composables";

export default function ChannelsComponent () {
    const {channels, currentChannelId, setCurrentChannel} = usePlayerStore()
    const handleShowChannels = () => {
        const triggerButton = document.getElementById("channels-trigger-button")
        if(triggerButton)
            triggerButton.click()
    }
    const changeActiveChannel = (id: number) => {
        setCurrentChannel(id)
        const closeButton = document.getElementById("channels-close-button")
        if (closeButton)
            closeButton.click()
    }
    const buttonClass = "w-full border border-gray-300 rounded-lg p-3 flex items-center gap-2"
    const activeButtonClass = "text-blue-900 bg-blue-200 border-none"
    return (
        <section>
            <GlassButton
                aria-label="نمایش لیست چنل ها"
                onClick={() => handleShowChannels()}
                showShadow={false}
                hasBg={false}
                hasBorder={false}
                className="w-full"
                >
                <div className="flex flex-col items-center justify-center gap-1">
                    <ListMusic className="h-6 w-6" />
                    <span className="text-[11px]">کانال ها</span>
                </div>
            </GlassButton>
            <Drawer>
                <DrawerTrigger className="hidden" id="channels-trigger-button">
                </DrawerTrigger>
                <DrawerContent>
                    <section className="bg-white/60 backdrop-blur p-2">
                        <DrawerHeader>
                            <DrawerTitle className="text-xl">لیست کانال ها</DrawerTitle>
                        </DrawerHeader>
                        <section className="mt-4 mb-8 grid grid-cols-2 gap-6 gap-y-3">
                            {channels.map(channel => (
                                <section key={channel.id}>
                                {channelsPerisanConvert(channel.shortcode) && (
                                    <button
                                    className={`${buttonClass} ${currentChannelId == channel.id ? activeButtonClass : ''}`}
                                    onClick={() => changeActiveChannel(channel.id)}
                                    >
                                        <h2 className="text-sm">{channelsPerisanConvert(channel.shortcode)}</h2>
                                        <MoveUpLeft size={14} />
                                    </button>
                                )}
                                </section>
                            ))}
                        </section>
                    </section>
                </DrawerContent>
                <DrawerClose className="hidden" id="channels-close-button" />
            </Drawer>
        </section>
    )
}