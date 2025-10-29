import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VehicleRatesService } from './vehcle_rates.service';
import { CreateVehicleRateDTO, VehicleRateDTO } from './dto/vehicle_rates.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { Admin } from '../auth/decorators/admin.decorator';
import { ZodResponse } from 'nestjs-zod';

@ApiTags('vehicle-rates')
@UseGuards(AuthGuard, AdminGuard)
@Controller('vehicle-rates')
export class VehicleRatesController {
  constructor(private readonly vehicleRatesService: VehicleRatesService) {}

  @Post()
  @Admin()
  @ApiOperation({ summary: 'Create a new vehicle rate (Admin only)' })
  @ZodResponse({ status: 201, type: VehicleRateDTO })
  async create(
    @Body() createDto: CreateVehicleRateDTO,
  ): Promise<VehicleRateDTO> {
    return this.vehicleRatesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicle rates' })
  async findAll(): Promise<VehicleRateDTO[]> {
    return this.vehicleRatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle rate by ID' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VehicleRateDTO> {
    return this.vehicleRatesService.findOne(id);
  }

  @Put(':id')
  @Admin()
  @ApiOperation({ summary: 'Update a vehicle rate (Admin only)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateVehicleRateDTO>,
  ): Promise<VehicleRateDTO> {
    return this.vehicleRatesService.update(id, updateDto);
  }

  @Delete(':id')
  @Admin()
  @ApiOperation({ summary: 'Delete a vehicle rate (Admin only)' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.vehicleRatesService.remove(id);
  }
}
