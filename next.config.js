/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BUCKET_HOST_NAME,
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
