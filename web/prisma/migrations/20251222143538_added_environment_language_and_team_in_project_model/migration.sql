/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `techstack` on the `Project` table. All the data in the column will be lost.
  - Added the required column `team` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Production', 'Staging', 'Development');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('Nodejs', 'Nextjs', 'Reactjs');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "techstack",
ADD COLUMN     "environment" "Environment" NOT NULL DEFAULT 'Production',
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'Nodejs',
ADD COLUMN     "team" TEXT NOT NULL;
