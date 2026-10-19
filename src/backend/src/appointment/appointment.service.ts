import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  async findAll(patientId?: string) {
    // TODO: Implement appointment listing
  }

  async book(disponibilidadId: string) {
    // TODO: Implement booking with transaction
  }

  async findAvailable(professionalId: string, from: string, to: string) {
    // TODO: Implement availability search
  }

  async updateStatus(id: string, status: string) {
    // TODO: Implement status update
  }
}