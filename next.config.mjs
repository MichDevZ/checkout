import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Fallback para usar módulos internos como 'buffer'
import buffer from 'buffer';

const nextConfig = {
  webpack: (config) => {
    // Agregar fallbacks para Webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: resolve('buffer/'), // Polyfill para 'buffer'
    };
    return config;
  },
};

export default nextConfig;
