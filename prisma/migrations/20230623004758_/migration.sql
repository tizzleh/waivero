/*
  Warnings:

  - You are about to drop the column `content` on the `WaiverTemplate` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "WaiverTemplate" DROP COLUMN "content",
ADD COLUMN     "waiverText" TEXT NOT NULL DEFAULT 'testing default through prisma';

-- DropTable
DROP TABLE "Test";
