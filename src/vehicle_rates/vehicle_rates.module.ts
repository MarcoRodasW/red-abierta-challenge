import { Module } from '@nestjs/common';
import { VehicleRatesController } from './vehicle_rates.controller';
import { VehicleRatesService } from './vehcle_rates.service';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [VehicleRatesController],
  providers: [VehicleRatesService],
  exports: [VehicleRatesService],
})
export class VehicleRatesModule {}
