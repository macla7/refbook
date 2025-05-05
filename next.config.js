/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rango-user-uploads-bucket.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
