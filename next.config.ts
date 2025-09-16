import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'radio.beeptunes.com'
      },
    ]
  }
};

export default nextConfig;
