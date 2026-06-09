import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationImageService } from 'src/destination-image/destination-image.service';
import { Repository } from 'typeorm';
import { DestinationEntity } from '../entities/destination.entity';

@Injectable()
export class DestinationService {
  private loggger = new Logger(DestinationService.name);
  constructor(
    @InjectRepository(DestinationEntity)
    private readonly destinationRepository: Repository<DestinationEntity>,
    private readonly destinationImageService: DestinationImageService,
  ) {}

  // //---------------------- LOGIC DESTINATION IMAGE
  // private async getImageByDestinationForCreate(id: number) {
  //   return await this.destinationImageRepository
  //     .createQueryBuilder('ds')
  //     .select('ds.image')
  //     .addSelect('ds.caption')
  //     .where('ds.destination_id = :id', { id })
  //     .getMany();
  // }

  //---------------------- LOGIC DESTINATION
  async list() {
    return this.destinationRepository.find({ relations: { tours: true } });
  }

  async getById(id: number) {
    // Complexity code high
    //
    // create # list # delete
    const destination = await this.destinationRepository.findOne({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: { id },
    });

    const images = await this.destinationImageService.getByDestinationId(
      destination.id,
    );

    this.loggger.debug({
      message: 'Data destination',
      data: destination,
    });

    this.loggger.log({
      message: 'Data image',
      data: images,
    });

    console.log('Data destination', destination);

    console.log('Data images', images);

    destination.images = images;

    return destination;
  }

  async create(destinationInfo: Partial<DestinationEntity>) {
    if (!destinationInfo.slug) {
      destinationInfo.slug =
        destinationInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') +
        '-' +
        Math.random().toString(36).substring(2, 7);
    }
    const destination = this.destinationRepository.create(destinationInfo);
    return this.destinationRepository.save(destination);
  }

  async delete(id: number) {
    await this.destinationRepository.delete(id);
    return { deleted: true };
  }

  async update(id: number, newDestinationInfo: Partial<DestinationEntity>) {
    await this.destinationRepository.update(id, newDestinationInfo);
    return this.getById(id);
  }
}
