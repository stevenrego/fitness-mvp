import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  // Admin, Coach, User
  const adminPass = await bcrypt.hash("admin123", 10);
  const coachPass = await bcrypt.hash("coach123", 10);
  const userPass = await bcrypt.hash("user123", 10);
  await prisma.user.createMany({
    data: [
      { email: "admin@demo.com", password: adminPass, name: "Admin", },
      { email: "coach@demo.com", password: coachPass, name: "Coach", },
      { email: "user@demo.com", password: userPass, name: "User", }
    ],
    skipDuplicates: true
  });
  // Add exercises, program, challenge, shop, rewards, subscriptions in KWD
  // (full seed data goes here)
}
main().finally(() => prisma.());
