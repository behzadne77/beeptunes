import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "اپلیکیشن موزیک",
  description: "اپلیکیشن موزیک زنده. تولید شده توسط بهزاد نعمتی",
};
import BottomNav from "@/components/BottomNav";
import QueryProvider from "./providers/QueryProvider";
import AppBootstrap from "./_components/AppBootstrap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} antialiased bg-white text-neutral-900`}> 
        <QueryProvider>
          <AppBootstrap>
            <main className="min-h-dvh">
              {children}
              <BottomNav />
            </main>
          </AppBootstrap>
        </QueryProvider>
      </body>
    </html>
  );
}
