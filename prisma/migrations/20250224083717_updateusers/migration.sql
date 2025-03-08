/*
  Warnings:

  - You are about to drop the column `full_name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "full_name",
ADD COLUMN     "fullName" TEXT NOT NULL;
