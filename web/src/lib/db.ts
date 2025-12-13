import { PrismaClient } from "../../prisma/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";
dotenv.config();

const neonConfig = {
  connectionString: process.env.DATABASE_URL,
};

const adapter = new PrismaNeon(neonConfig);
const prisma = new PrismaClient({
  adapter,
});
export default prisma;
