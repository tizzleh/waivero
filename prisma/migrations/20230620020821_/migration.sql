/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOrganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Waiver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaiverTemplate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganization" DROP CONSTRAINT "UserOrganization_userId_fkey";

-- DropForeignKey
ALTER TABLE "WaiverTemplate" DROP CONSTRAINT "WaiverTemplate_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "WaiverTemplate" DROP CONSTRAINT "WaiverTemplate_templateId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "organizationId",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "organizationId",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "stripe_current_period_end" TIMESTAMP(3),
ADD COLUMN     "stripe_plan_id" TEXT,
ADD COLUMN     "stripe_price_id" TEXT,
ADD COLUMN     "stripe_product_id" TEXT,
ADD COLUMN     "stripe_subscription_id" TEXT;

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "Template";

-- DropTable
DROP TABLE "UserOrganization";

-- DropTable
DROP TABLE "Waiver";

-- DropTable
DROP TABLE "WaiverTemplate";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");
