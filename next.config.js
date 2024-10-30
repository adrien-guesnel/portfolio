/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
}

const withNextIntl = require("next-intl/plugin")("./i18n.ts")

module.exports = withNextIntl(nextConfig)
