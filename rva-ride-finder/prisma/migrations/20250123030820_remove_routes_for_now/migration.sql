/*
  Warnings:

  - You are about to drop the column `routeId` on the `Ride` table. All the data in the column will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_routeId_fkey";

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "routeId";

-- DropTable
DROP TABLE "Route";
