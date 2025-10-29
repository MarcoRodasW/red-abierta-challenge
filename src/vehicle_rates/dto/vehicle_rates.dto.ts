import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export enum Vehicle_Type {
  CAR,
  MOTORCYCLE,
  SPECIAL,
}

export const VehicleTypeSchema = z.enum(['CAR', 'MOTORCYCLE', 'SPECIAL']);

export const CreateVehicleRateSchema = z.object({
  vehicule_type: VehicleTypeSchema,
  hourly_Rate: z
    .number()
    .min(0, 'No pueden haber valores negativos')
    .default(15),
});

export const VehicleRateSchema = CreateVehicleRateSchema.extend({
  id: z.number(),
});

export class CreateVehicleRateDTO extends createZodDto(
  CreateVehicleRateSchema,
) {}

export class VehicleRateDTO extends createZodDto(VehicleRateSchema) {}

export type CreateVehicleRate = z.infer<typeof CreateVehicleRateSchema>;
export type VehicleRate = z.infer<typeof VehicleRateSchema>;
