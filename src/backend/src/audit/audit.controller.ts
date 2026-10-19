import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('admin/audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(
    @Query('actor') actor?: string,
    @Query('action') action?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.auditService.findAll(actor, action, from, to);
  }
}