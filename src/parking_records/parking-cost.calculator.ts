export class ParkingCostCalculator {
  static calculate(
    entryTime: Date,
    exitTime: Date,
    hourlyRate: number,
    vehicleType: string,
  ): number {
    if (vehicleType === 'MOTORCYCLE') {
      return 0;
    }

    const durationMs = exitTime.getTime() - entryTime.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);

    const wholeHours = Math.floor(durationHours);
    const remainingMinutes = (durationHours - wholeHours) * 60;

    const billedHours = remainingMinutes >= 30 ? wholeHours + 1 : wholeHours;

    return billedHours * hourlyRate;
  }
}
