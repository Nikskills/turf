/*
  Warnings:

  - Added the required column `userId` to the `StockTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Consumption" DROP CONSTRAINT "Consumption_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "ConsumptionSession" DROP CONSTRAINT "ConsumptionSession_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_buyerId_fkey";

-- AlterTable
ALTER TABLE "StockTransaction" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionSession" ADD CONSTRAINT "ConsumptionSession_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ConsumptionSession"("consumptionSessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransaction" ADD CONSTRAINT "StockTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
