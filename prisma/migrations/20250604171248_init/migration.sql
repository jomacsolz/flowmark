/*
  Warnings:

  - You are about to drop the column `data` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `date` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "data",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
