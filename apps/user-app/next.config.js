/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/db"],
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg", "bcrypt"],
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/**', '**/.next/**', '**/out.txt'],
      poll: false,
    };
    return config;
  },
  turbopack: {},
};

export default nextConfig;
