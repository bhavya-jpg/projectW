/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['192.168.29.19'],
  transpilePackages: ['sarvam-conv-ai-sdk'],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
