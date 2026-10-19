import { Injectable } from '@nestjs/common';

@Injectable()
export class AttachmentService {
  async findOne(id: string) {
    // TODO: Implement attachment retrieval
  }

  async upload(file: Express.Multer.File, encounterId: string) {
    // TODO: Implement file upload
  }
}