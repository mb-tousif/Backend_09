/*
  Warnings:

  - You are about to drop the column `bookingId` on the `payments` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_bookingId_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "bookingId",
ADD COLUMN     "cartId" TEXT NOT NULL,
ADD COLUMN     "paymentGatewayData" JSONB,
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
