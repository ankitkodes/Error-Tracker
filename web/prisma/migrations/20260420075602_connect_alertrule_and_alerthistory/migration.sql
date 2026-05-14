/*
  Warnings:

  - Added the required column `alertruleId` to the `AlertHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `AlertRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertHistory" ADD COLUMN     "alertruleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AlertRule" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AlertRule" ADD CONSTRAINT "AlertRule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertHistory" ADD CONSTRAINT "AlertHistory_alertruleId_fkey" FOREIGN KEY ("alertruleId") REFERENCES "AlertRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
