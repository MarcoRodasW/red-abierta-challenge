-- CreateEnum
CREATE TYPE "Vehicle_Type" AS ENUM ('CAR', 'MOTORCYCLE', 'SPECIAL');

-- CreateTable
CREATE TABLE "Vehicle_Rates" (
    "id" SERIAL NOT NULL,
    "vehicule_type" "Vehicle_Type" NOT NULL,
    "hourly_Rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vehicle_Rates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_Rates_vehicule_type_key" ON "Vehicle_Rates"("vehicule_type");
