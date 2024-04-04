/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fiery-vulture-918.convex.cloud"
      }
    ]
  }
};

export default nextConfig;
