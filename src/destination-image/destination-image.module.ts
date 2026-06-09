import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationImageEntity } from 'src/entities';
import { DestinationImageService } from './destination-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationImageEntity])],
  providers: [DestinationImageService],
  exports: [DestinationImageService],
})
export class DestinationImageModule {}
