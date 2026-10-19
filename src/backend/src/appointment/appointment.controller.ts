import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll(@Query('patientId') patientId?: string) {
    return this.appointmentService.findAll(patientId);
  }

  @Post()
  book(@Body() bookDto: BookDto) {
    return this.appointmentService.book(bookDto.disponibilidadId);
  }

  @Get('availability')
  findAvailable(
    @Query('professionalId') professionalId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.appointmentService.findAvailable(professionalId, from, to);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.appointmentService.updateStatus(id, updateStatusDto.status);
  }
}