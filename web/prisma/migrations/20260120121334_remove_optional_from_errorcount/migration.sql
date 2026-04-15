/*
  Warnings:

  - Made the column `errorCount` on table `Error` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Error" ALTER COLUMN "errorCount" SET NOT NULL;
