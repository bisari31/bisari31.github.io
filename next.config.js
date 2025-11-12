const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  output: 'export',
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://bisari31.github.io'
      : undefined,
  images: { unoptimized: true },
  // images: { unoptimized: true, domains: ['github.com'] },
  swcMinify: false,
};

module.exports = withContentlayer(nextConfig);
