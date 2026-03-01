/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `ErrorAnalytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ErrorAnalytics_date_key" ON "ErrorAnalytics"("date");
