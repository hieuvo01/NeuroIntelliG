/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HTTP_URL: "http://localhost:8080",
  },
  crossOrigin: 'anonymous',
};

export default nextConfig;
