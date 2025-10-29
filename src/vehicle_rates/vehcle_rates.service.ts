/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateVehicleRate, VehicleRate } from './dto/vehicle_rates.dto';

@Injectable()
export class VehicleRatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateVehicleRate): Promise<VehicleRate> {
    return await this.prisma.vehicle_Rates.create({ data });
  }

  async findAll(): Promise<VehicleRate[]> {
    const rates = await this.prisma.vehicle_Rates.findMany();
    return rates;
  }

  async findOne(id: number): Promise<VehicleRate> {
    const rate = await this.prisma.vehicle_Rates.findUnique({
      where: { id },
    });

    if (!rate) {
      throw new NotFoundException(`Vehicle rate with ID ${id} not found`);
    }

    return rate;
  }

  async update(
    id: number,
    data: Partial<CreateVehicleRate>,
  ): Promise<VehicleRate> {
    await this.findOne(id);

    const rate = await this.prisma.vehicle_Rates.update({
      where: { id },
      data: {
        ...(data.vehicule_type && { vehicule_type: data.vehicule_type }),
        ...(data.hourly_Rate !== undefined && {
          hourly_Rate: data.hourly_Rate,
        }),
      },
    });

    return rate;
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);

    await this.prisma.vehicle_Rates.delete({
      where: { id },
    });

    return true;
  }
}
