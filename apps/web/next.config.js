const withNextIntl = require("next-intl/plugin")("./i18n.ts");
const { NEXT_PUBLIC_STRAPI_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: NEXT_PUBLIC_STRAPI_URL?.startsWith("https") ? "https" : "http",
        hostname: NEXT_PUBLIC_STRAPI_URL?.split("//")[1]?.replace(/\/+$/, ""),
      }
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
});

module.exports = nextConfig;
