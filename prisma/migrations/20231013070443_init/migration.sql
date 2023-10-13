/*
  Warnings:

  - You are about to drop the column `date` on the `shedules` table. All the data in the column will be lost.
  - Added the required column `duration` to the `shedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `shedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `shedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "shedules" DROP COLUMN "date",
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL;
