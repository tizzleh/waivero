-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Guest', 'Signer', 'Admin', 'Org');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
