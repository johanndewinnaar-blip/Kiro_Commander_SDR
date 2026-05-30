import type { NextConfig } from 'next';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  // Commander SDR — local-first development, no external API calls
  outputFileTracingRoot: resolve(__dirname, '../../'),
};

export default nextConfig;
