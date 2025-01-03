/*
  Warnings:

  - A unique constraint covering the columns `[aadharNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aadharNo" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "course" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "documentsId" TEXT,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "idMark" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "session" TEXT,
ADD COLUMN     "university" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "tenthMarksheet" TEXT,
    "twelfthMarksheet" TEXT,
    "graduationMarksheet" TEXT,
    "lastDegreeCertificate" TEXT,
    "technicalQualifications" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_aadharNo_key" ON "User"("aadharNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_documentsId_key" ON "User"("documentsId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_documentsId_fkey" FOREIGN KEY ("documentsId") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
