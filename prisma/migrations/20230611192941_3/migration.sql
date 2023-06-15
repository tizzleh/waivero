/*
  Warnings:

  - You are about to drop the column `credits` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `creditsEarnedViaReferrals` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackCreditsGranted` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `referredByUserId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_current_period_end` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_subscription_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_referredByUserId_fkey";

-- DropIndex
DROP INDEX "users_referredByUserId_idx";

-- DropIndex
DROP INDEX "users_stripe_customer_id_key";

-- DropIndex
DROP INDEX "users_stripe_subscription_id_key";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "stripe_current_period_end" TIMESTAMP(3),
ADD COLUMN     "stripe_plan_id" TEXT,
ADD COLUMN     "stripe_price_id" TEXT,
ADD COLUMN     "stripe_product_id" TEXT,
ADD COLUMN     "stripe_subscription_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "credits",
DROP COLUMN "creditsEarnedViaReferrals",
DROP COLUMN "feedbackCreditsGranted",
DROP COLUMN "referredByUserId",
DROP COLUMN "stripe_current_period_end",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "stripe_price_id",
DROP COLUMN "stripe_subscription_id";

-- CreateIndex
CREATE UNIQUE INDEX "Organization_stripe_subscription_id_key" ON "Organization"("stripe_subscription_id");
