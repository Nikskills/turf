/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CONSUMPTION', 'PURCHASE');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Purchase" (
    "purchaseId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "quantityOfBeers" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateTable
CREATE TABLE "ConsumptionSession" (
    "consumptionSessionId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsumptionSession_pkey" PRIMARY KEY ("consumptionSessionId")
);

-- CreateTable
CREATE TABLE "Consumption" (
    "consumptionId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Consumption_pkey" PRIMARY KEY ("consumptionId")
);

-- CreateTable
CREATE TABLE "StockTransaction" (
    "transactionId" TEXT NOT NULL,
    "change_amount" INTEGER NOT NULL,
    "transactionType" "Type" NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockTransaction_pkey" PRIMARY KEY ("transactionId")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumptionSession" ADD CONSTRAINT "ConsumptionSession_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ConsumptionSession"("consumptionSessionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
