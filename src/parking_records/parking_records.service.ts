import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { EntryParking, ExitParking } from './dto/parking_records.dto';
import { ParkingCostCalculator } from './parking-cost.calculator';

@Injectable()
export class ParkingRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async registerEntry(data: EntryParking) {
    const existingRecord = await this.prisma.parking_Records.findFirst({
      where: {
        license_plate: data.license_plate,
        status: 'PARKED',
      },
    });

    if (existingRecord) {
      throw new ConflictException(
        `Vehicle with license plate ${data.license_plate} is already parked`,
      );
    }

    const vehicleType = await this.prisma.vehicle_Rates.findUnique({
      where: { id: data.vehicle_typeId },
    });

    if (!vehicleType) {
      throw new NotFoundException(
        `Vehicle type with ID ${data.vehicle_typeId} not found`,
      );
    }

    return this.prisma.parking_Records.create({
      data: {
        license_plate: data.license_plate,
        vehicle_typeId: data.vehicle_typeId,
        status: 'PARKED',
        total_cost: 0,
      },
      include: {
        vehicle_type: true,
      },
    });
  }

  async registerExit(data: ExitParking) {
    const activeRecord = await this.prisma.parking_Records.findFirst({
      where: {
        license_plate: data.license_plate,
        status: 'PARKED',
      },
      include: {
        vehicle_type: true,
      },
    });

    if (!activeRecord) {
      throw new NotFoundException(
        `No active parking record found for license plate ${data.license_plate}`,
      );
    }

    const totalCost = ParkingCostCalculator.calculate(
      activeRecord.entry_time,
      new Date(data.exit_time),
      activeRecord.vehicle_type.hourly_Rate,
      activeRecord.vehicle_type.vehicule_type,
    );

    return this.prisma.parking_Records.update({
      where: { id: activeRecord.id },
      data: {
        exit_time: data.exit_time,
        status: 'EXITED',
        total_cost: totalCost,
      },
      include: {
        vehicle_type: true,
      },
    });
  }

  async findAll() {
    return this.prisma.parking_Records.findMany({
      include: {
        vehicle_type: true,
      },
    });
  }
}
