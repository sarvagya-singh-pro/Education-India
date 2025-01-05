/*
  Warnings:

  - The values [ONLINE,OFFLINE,HYBRID] on the enum `Mode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Mode_new" AS ENUM ('Offline', 'Online', 'Hybrid');
ALTER TABLE "colleges" ALTER COLUMN "degreeModes" TYPE "Mode_new"[] USING ("degreeModes"::text::"Mode_new"[]);
ALTER TYPE "Mode" RENAME TO "Mode_old";
ALTER TYPE "Mode_new" RENAME TO "Mode";
DROP TYPE "Mode_old";
COMMIT;
