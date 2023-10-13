-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending',
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';
