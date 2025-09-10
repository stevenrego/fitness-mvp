-- Prisma Migrate SQL
-- This SQL file is auto-generated for initializing the fitness-mvp schema.
-- Run via `npx prisma migrate deploy`

CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add other CREATE TABLE statements as needed per your schema.prisma
-- You can regenerate this fully using `npx prisma migrate dev` locally if needed.
