/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.pngfind.com", "encrypted-tbn0.gstatic.com", "i.pinimg.com"],
  },
};

module.exports = nextConfig;
