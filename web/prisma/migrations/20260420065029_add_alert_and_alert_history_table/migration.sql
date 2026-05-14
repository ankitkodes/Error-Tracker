-- CreateTable
CREATE TABLE "AlertRule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "destination" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "lastTriggered" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlertRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertHistory" (
    "id" TEXT NOT NULL,
    "ruleName" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "triggeredAt" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AlertRule_id_key" ON "AlertRule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AlertHistory_id_key" ON "AlertHistory"("id");
