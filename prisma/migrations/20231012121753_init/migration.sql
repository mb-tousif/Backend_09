/*
  Warnings:

  - You are about to drop the column `reviewId` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `shedule` on the `services` table. All the data in the column will be lost.
  - Added the required column `schedule` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "shedule",
ADD COLUMN     "schedule" TEXT NOT NULL;
