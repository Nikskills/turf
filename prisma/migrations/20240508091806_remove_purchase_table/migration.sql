/*
  Warnings:

  - You are about to drop the column `change_amount` on the `StockTransaction` table. All the data in the column will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `StockTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_buyerId_fkey";

-- AlterTable
ALTER TABLE "StockTransaction" DROP COLUMN "change_amount",
ADD COLUMN     "cost" DOUBLE PRECISION,
ADD COLUMN     "purchaseDate" TIMESTAMP(3),
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Purchase";
