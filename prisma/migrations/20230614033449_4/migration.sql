/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `waiverPdf` on the `Waiver` table. All the data in the column will be lost.
  - Added the required column `waiverText` to the `Waiver` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Waiver" DROP CONSTRAINT "Waiver_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Waiver" DROP CONSTRAINT "Waiver_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Waiver" DROP CONSTRAINT "Waiver_userId_fkey";

-- AlterTable
ALTER TABLE "Waiver" DROP COLUMN "organizationId",
DROP COLUMN "templateId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "waiverPdf",
ADD COLUMN     "waiverText" TEXT NOT NULL;
