import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // You can add remark/rehype here if you later need them for file-based MDX
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  allowedDevOrigins: ['172.235.158.51'],
};

export default withMDX(nextConfig);
