/*
  Warnings:

  - You are about to drop the column `key` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Setting` table. All the data in the column will be lost.
  - Added the required column `address` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationName` to the `Setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Setting_key_key";

-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "key",
DROP COLUMN "value",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "favicon" TEXT,
ADD COLUMN     "footerText" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "mission" TEXT,
ADD COLUMN     "organizationName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "shortName" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "vision" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "youtube" TEXT;
