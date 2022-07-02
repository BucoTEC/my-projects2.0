import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PhotosController } from './photos.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [PhotosController],
})
export class PhotosModule {}
