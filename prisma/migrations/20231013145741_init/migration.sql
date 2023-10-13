-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending to book',
ALTER COLUMN "quantity" SET DEFAULT 1;
