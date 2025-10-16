import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // Avoid reinitializing Prisma in dev hot reload
  var __prisma__: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma__) {
    global.__prisma__ = new PrismaClient();
  }
  prisma = global.__prisma__;
}

// ✅ Graceful connection test (optional)
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (err:any) {
    console.error("❌ Database connection failed:", err?.message);
  }
}
testConnection();

export { prisma };
