import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateEncounterDto } from './dto/create-encounter.dto';
import { EncounterService } from './encounter.service';

@Controller('encounters')
export class EncounterController {
  constructor(private readonly encounterService: EncounterService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encounterService.findOne(id);
  }

  @Post()
  create(@Body() createEncounterDto: CreateEncounterDto) {
    return this.encounterService.create(createEncounterDto);
  }
}