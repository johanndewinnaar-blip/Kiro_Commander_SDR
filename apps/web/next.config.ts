import type { NextConfig } from 'next';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  // Commander SDR — local-first development, no external API calls
  outputFileTracingRoot: resolve(__dirname, '../../'),
  webpack: (config, { isServer }) => {
    // Suppress optional 'canvas' dependency from vega-canvas (not needed for browser rendering)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    // Mark 'canvas' as external on server to avoid build failure
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas'];
    }
    return config;
  },
};

export default nextConfig;
