/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/store"],
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg", "bcrypt"],
};

export default nextConfig;
