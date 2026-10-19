import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { ProfessionalService } from './professional.service';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Get('agenda')
  getAgenda() {
    return this.professionalService.getAgenda();
  }

  @Put('availability')
  updateAvailability(@Body() updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.professionalService.updateAvailability(updateAvailabilityDto.slots);
  }
}