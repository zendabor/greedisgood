/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    loader: "custom",
    loaderFile: "./imageLoader.js",
    deviceSizes: [260, 400, 640, 750, 828, 1080, 1200, 1920, 2400],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
