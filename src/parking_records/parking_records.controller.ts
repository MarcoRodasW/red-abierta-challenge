import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ParkingRecordsService } from './parking_records.service';
import {
  EntryParkingDTO,
  ExitParkingDTO,
  ParkingRecordDTO,
} from './dto/parking_records.dto';

@Controller('parking')
@UseGuards(AuthGuard)
@ApiTags('Parking Records')
export class ParkingRecordsController {
  constructor(private readonly parkingRecordsService: ParkingRecordsService) {}

  @Post('entry')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register vehicle entry into parking facility' })
  @ApiResponse({
    status: 201,
    description: 'Vehicle entry registered successfully',
    type: ParkingRecordDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle type not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Vehicle is already parked',
  })
  async registerEntry(@Body() entryData: EntryParkingDTO) {
    return this.parkingRecordsService.registerEntry(entryData);
  }

  @Post('exit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register vehicle exit from parking facility' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle exit registered successfully with calculated cost',
    type: ParkingRecordDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 404,
    description: 'No active parking record found for the license plate',
  })
  async registerExit(@Body() exitData: ExitParkingDTO) {
    return this.parkingRecordsService.registerExit(exitData);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all parking records' })
  @ApiResponse({
    status: 200,
    description: 'List of all parking records retrieved successfully',
    type: [ParkingRecordDTO],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async findAll() {
    return this.parkingRecordsService.findAll();
  }
}
