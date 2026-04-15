/*
  Warnings:

  - You are about to drop the column `errorCount` on the `Error` table. All the data in the column will be lost.
  - Added the required column `lineNumber` to the `Error` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Error" DROP COLUMN "errorCount",
ADD COLUMN     "errorType" TEXT,
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "lineNumber" INTEGER NOT NULL,
ADD COLUMN     "occurrence" INTEGER NOT NULL DEFAULT 1;
