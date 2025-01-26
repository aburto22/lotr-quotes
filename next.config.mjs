/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "static.wikia.nocookie.net",
      },
    ],
  },
};

export default nextConfig;
