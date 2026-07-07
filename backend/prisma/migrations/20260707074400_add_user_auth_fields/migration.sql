/*
  Warnings:

  - You are about to drop the column `facebook` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `favicon` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `footerText` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `mission` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `Setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "facebook",
DROP COLUMN "favicon",
DROP COLUMN "footerText",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "mission",
DROP COLUMN "twitter",
DROP COLUMN "vision",
DROP COLUMN "youtube";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isStaff" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
