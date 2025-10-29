import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ParkingRecordsController } from './parking_records.controller';
import { ParkingRecordsService } from './parking_records.service';

@Module({
  imports: [CommonModule],
  controllers: [ParkingRecordsController],
  providers: [ParkingRecordsService],
  exports: [ParkingRecordsService],
})
export class ParkingRecordsModule {}
