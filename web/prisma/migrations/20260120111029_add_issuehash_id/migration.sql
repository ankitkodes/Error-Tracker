/*
  Warnings:

  - A unique constraint covering the columns `[issuehashId]` on the table `Error` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Error" ADD COLUMN     "issuehashId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Error_issuehashId_key" ON "Error"("issuehashId");
