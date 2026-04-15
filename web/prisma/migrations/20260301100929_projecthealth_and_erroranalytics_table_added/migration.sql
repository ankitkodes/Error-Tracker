-- CreateEnum
CREATE TYPE "Projectstatus" AS ENUM ('Healthy', 'Warning', 'Critical');

-- CreateTable
CREATE TABLE "ErrorAnalytics" (
    "id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "error" INTEGER NOT NULL,
    "resolvederror" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectHealth" (
    "id" INTEGER NOT NULL,
    "totalerrors" INTEGER NOT NULL,
    "resolvederror" INTEGER NOT NULL,
    "uptimepercentage" INTEGER NOT NULL,
    "status" "Projectstatus" NOT NULL DEFAULT 'Healthy',
    "projectId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ErrorAnalytics_id_key" ON "ErrorAnalytics"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectHealth_id_key" ON "ProjectHealth"("id");

-- AddForeignKey
ALTER TABLE "ErrorAnalytics" ADD CONSTRAINT "ErrorAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHealth" ADD CONSTRAINT "ProjectHealth_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
