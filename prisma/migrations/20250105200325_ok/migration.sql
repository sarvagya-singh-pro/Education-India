/*
  Warnings:

  - Added the required column `Aditional` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examScore` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examType` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "Aditional" TEXT NOT NULL,
ADD COLUMN     "examScore" INTEGER NOT NULL,
ADD COLUMN     "examType" TEXT NOT NULL;
