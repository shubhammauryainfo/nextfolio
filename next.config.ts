import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
        {
          protocol: "https",
          hostname: "pagedone.io",
          port: "",
          pathname: "/**",
        },
    ],
  },
};
