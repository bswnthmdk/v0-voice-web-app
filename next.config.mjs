/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    swcPlugins: [
      [
        "@swc/plugin-proposal-pipeline-operator",
        { proposal: "hack" } // or "smart" depending on the code
      ]
    ]
  }
}

export default nextConfig
