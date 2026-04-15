/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ErrorAnalytics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `ProjectHealth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ErrorAnalytics_id_key";

-- DropIndex
DROP INDEX "ProjectHealth_id_key";

-- AlterTable
CREATE SEQUENCE erroranalytics_id_seq;
ALTER TABLE "ErrorAnalytics" ALTER COLUMN "id" SET DEFAULT nextval('erroranalytics_id_seq');
ALTER SEQUENCE erroranalytics_id_seq OWNED BY "ErrorAnalytics"."id";

-- AlterTable
CREATE SEQUENCE projecthealth_id_seq;
ALTER TABLE "ProjectHealth" ALTER COLUMN "id" SET DEFAULT nextval('projecthealth_id_seq');
ALTER SEQUENCE projecthealth_id_seq OWNED BY "ProjectHealth"."id";

-- CreateIndex
CREATE UNIQUE INDEX "ErrorAnalytics_userId_key" ON "ErrorAnalytics"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectHealth_projectId_key" ON "ProjectHealth"("projectId");
