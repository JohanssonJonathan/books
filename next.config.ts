import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  headers: () =>
    Promise.resolve([
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ]),
};
export default nextConfig;
