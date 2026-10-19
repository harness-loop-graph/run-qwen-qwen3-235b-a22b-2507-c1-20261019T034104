export class UpdateAvailabilityDto {
  slots: {
    start: string;
    end: string;
  }[];
}