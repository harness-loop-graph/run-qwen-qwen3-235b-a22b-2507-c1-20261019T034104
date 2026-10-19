import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  async findAll(actor?: string, action?: string, from?: string, to?: string) {
    // TODO: Implement audit log query
  }
}