-- CreateTable
CREATE TABLE "ErrorType" (
    "id" TEXT NOT NULL,
    "typename" TEXT NOT NULL,
    "occurrence" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ErrorType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ErrorType_id_key" ON "ErrorType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorType_typename_key" ON "ErrorType"("typename");

-- AddForeignKey
ALTER TABLE "ErrorType" ADD CONSTRAINT "ErrorType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
