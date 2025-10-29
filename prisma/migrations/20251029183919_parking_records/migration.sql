-- CreateEnum
CREATE TYPE "Parking_Status" AS ENUM ('PARKED', 'EXITED');

-- CreateTable
CREATE TABLE "Parking_Records" (
    "id" SERIAL NOT NULL,
    "license_plate" VARCHAR(20) NOT NULL,
    "vehicle_typeId" INTEGER NOT NULL,
    "entry_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit_time" TIMESTAMP(3),
    "status" "Parking_Status" NOT NULL DEFAULT 'PARKED',
    "total_cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parking_Records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parking_Records" ADD CONSTRAINT "Parking_Records_vehicle_typeId_fkey" FOREIGN KEY ("vehicle_typeId") REFERENCES "Vehicle_Rates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
