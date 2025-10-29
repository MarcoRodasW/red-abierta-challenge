import { createZodDto } from 'nestjs-zod';
import { VehicleRateSchema } from 'src/vehicle_rates/dto/vehicle_rates.dto';
import z from 'zod';

export enum Parking_Status {
  PARKED,
  EXITED,
}

export const ParkingStatusSchema = z.enum(['PARKED', 'EXITED']);

export const EntryParkingSchema = z.object({
  license_plate: z.string().min(7).max(20).toUpperCase(),
  vehicle_typeId: z.number(),
});

export const ExitParkingSchema = z.object({
  license_plate: z.string().min(7).max(20).toUpperCase(),
  exit_time: z.iso.datetime(),
});

export const ParkingRecordSchema = z.object({
  id: z.number(),
  license_plate: z.string().min(7).max(20).toUpperCase(),
  vehicle_typeId: z.number(),
  vehicle_type: VehicleRateSchema,
  entry_time: z.iso.datetime(),
  exit_time: z.iso.datetime().optional(),
  parking_status: ParkingStatusSchema,
  total_cost: z.number().default(0),
});

export class EntryParkingDTO extends createZodDto(EntryParkingSchema) {}
export class ExitParkingDTO extends createZodDto(ExitParkingSchema) {}
export class ParkingRecordDTO extends createZodDto(ParkingRecordSchema) {}

export type EntryParking = z.infer<typeof EntryParkingSchema>;
export type ExitParking = z.infer<typeof ExitParkingSchema>;
export type ParkingRecord = z.infer<typeof ParkingRecordSchema>;
