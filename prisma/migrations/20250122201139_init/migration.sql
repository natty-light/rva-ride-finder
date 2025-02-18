-- CreateEnum
CREATE TYPE "RideCategories" AS ENUM ('Road', 'Gravel', 'Mountain', 'Trail');

-- CreateEnum
CREATE TYPE "RideDifficulties" AS ENUM ('Red', 'Yellow', 'Green');

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "host" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "startDate" DATE NOT NULL,
    "category" "RideCategories" NOT NULL DEFAULT 'Road',
    "difficulty" "RideDifficulties" NOT NULL DEFAULT 'Green',
    "isDrop" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
