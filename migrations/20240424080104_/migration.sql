/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aadharNo" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "course" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "documents10th" TEXT,
ADD COLUMN     "documents12th" TEXT,
ADD COLUMN     "documentsGraduation" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fathersName" TEXT,
ADD COLUMN     "identificationMark" TEXT,
ADD COLUMN     "lastEducationPassingYear" INTEGER,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "modeOpted" TEXT,
ADD COLUMN     "mothersName" TEXT,
ADD COLUMN     "session" TEXT,
ADD COLUMN     "university" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
