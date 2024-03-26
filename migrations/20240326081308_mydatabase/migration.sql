-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "forgotPasswordString" TEXT NOT NULL,
    "forgotPasswordExpiration" TIMESTAMP(3) NOT NULL,
    "verifyTokenString" TEXT NOT NULL,
    "verifyTokenExpiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
