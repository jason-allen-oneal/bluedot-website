import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  allowedDevOrigins: ['172.235.158.51'],
  experimental: { 
    serverActions: { allowedOrigins: ["*"] },
    esmExternals: 'loose'
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }] 
  }
};
