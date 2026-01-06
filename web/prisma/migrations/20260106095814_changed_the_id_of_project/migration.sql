-- DropForeignKey
ALTER TABLE "Error" DROP CONSTRAINT "Error_projectId_fkey";

-- AlterTable
ALTER TABLE "Error" ALTER COLUMN "projectId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Project_id_seq";

-- AddForeignKey
ALTER TABLE "Error" ADD CONSTRAINT "Error_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
