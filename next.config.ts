import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http", // ✅ backend protocol
        hostname: "localhost", // ✅ backend hostname
        port: "5000", // ✅ backend port
        pathname: "/api/products/**", // ✅ image endpoint
      },
    ],
  },
};

export default nextConfig;
