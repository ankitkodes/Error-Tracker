/*
  Warnings:

  - You are about to drop the column `project` on the `AlertRule` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AlertRule` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `AlertRule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlertRule" DROP CONSTRAINT "AlertRule_userId_fkey";

-- Step 1: Drop old columns
ALTER TABLE "AlertRule" DROP COLUMN "project",
DROP COLUMN "userId";

-- Step 2: Add projectId as nullable first
ALTER TABLE "AlertRule" ADD COLUMN "projectId" TEXT;

-- Step 3: Backfill existing rows (replace 'your-real-project-id' with an actual ID from your Project table)
UPDATE "AlertRule" SET "projectId" = 'your-real-project-id';

-- Step 4: Now make it NOT NULL
ALTER TABLE "AlertRule" ALTER COLUMN "projectId" SET NOT NULL;

-- Step 5: Set default for active
ALTER TABLE "AlertRule" ALTER COLUMN "active" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "AlertRule" ADD CONSTRAINT "AlertRule_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;