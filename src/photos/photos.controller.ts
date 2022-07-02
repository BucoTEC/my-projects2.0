import { Controller, Post } from '@nestjs/common';

@Controller('photos')
export class PhotosController {
  @Post()
  uploadSingle() {
    return 'upload single route';
  }
}
