/*
  Warnings:

  - The values [ADMIN,ORG,USER,GUEST] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('Admin', 'Org', 'User', 'Guest');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
