/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "**.flaticon.com",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "**.unsplash.com",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "**.freepik.com",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
