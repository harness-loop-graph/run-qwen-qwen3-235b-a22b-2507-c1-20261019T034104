import { Controller, Get, Post, Param, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentService } from './attachment.service';

@Controller('attachments')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentService.findOne(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body('encounterId') encounterId: string) {
    return this.attachmentService.upload(file, encounterId);
  }
}