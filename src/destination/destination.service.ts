import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationImageService } from 'src/destination-image/destination-image.service';
import { ECODE } from 'src/exceptions';
import { DestinationLogging } from 'src/logging/common.logging';
import { Repository } from 'typeorm';
import { DestinationEntity } from '../entities/destination.entity';

@Injectable()
export class DestinationService {
  private logger = new DestinationLogging(DestinationService.name);
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
    // Success
    const destination = await this.destinationRepository.findOne({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: { id },
    });

    if (!destination) {
      throw new NotFoundException(
        'Not found destination',
        ECODE.DESTINATION_SERVICE_LOGIC.toString(),
      );
    }

    this.logger.logDestination(DestinationService.name, destination, null);

    const images = await this.destinationImageService.getByDestinationId(
      destination.id,
    );

    // Simulation;
    throw new ForbiddenException(
      'Image got error',
      ECODE.IMAGE_SERVICE_LOGIC.toString(),
    );

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
