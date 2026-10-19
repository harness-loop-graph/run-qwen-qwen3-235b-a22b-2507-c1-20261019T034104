import { Module } from '@nestjs/common';
import { EncounterService } from './encounter.service';
import { EncounterController } from './encounter.controller';

@Module({
  providers: [EncounterService],
  controllers: [EncounterController]
})
export class EncounterModule {}
