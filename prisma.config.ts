// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // 改成直接写死的路径，或者保留环境变量但加上类型断言
    url: 'file:./prisma/dev.db', // 方式一：直接写死（最简单）
    // url: process.env["DATABASE_URL"] as string, // 方式二：保留环境变量，加类型断言
  },
});