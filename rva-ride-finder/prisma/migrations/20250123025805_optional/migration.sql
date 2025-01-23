-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_routeId_fkey";

-- AlterTable
ALTER TABLE "Ride" ALTER COLUMN "routeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
