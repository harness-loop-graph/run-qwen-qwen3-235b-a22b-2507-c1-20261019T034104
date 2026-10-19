import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessionalService {
  async getAgenda() {
    // TODO: Implement agenda retrieval
  }

  async updateAvailability(slots: { start: string; end: string }[]) {
    // TODO: Implement availability update
  }
}