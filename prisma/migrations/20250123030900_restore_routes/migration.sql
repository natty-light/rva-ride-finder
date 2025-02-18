-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "routeId" INTEGER;

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
