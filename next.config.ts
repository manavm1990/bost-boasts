export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Optional author headshots on editorial submissions (2 MB cap in action).
      bodySizeLimit: "3mb",
    },
  },
  typedRoutes: true,
};
