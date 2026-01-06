/*
  Warnings:

  - You are about to drop the column `colno` on the `Error` table. All the data in the column will be lost.
  - You are about to drop the column `lineno` on the `Error` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Error` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Error` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apikey]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('Error', 'Warning');

-- AlterTable
ALTER TABLE "Error" DROP COLUMN "colno",
DROP COLUMN "lineno",
DROP COLUMN "source",
DROP COLUMN "type",
ADD COLUMN     "severity" "Severity" NOT NULL DEFAULT 'Error';

-- CreateIndex
CREATE UNIQUE INDEX "Project_apikey_key" ON "Project"("apikey");
