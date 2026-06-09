import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationImageEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationImageService {
  constructor(
    @InjectRepository(DestinationImageEntity)
    private readonly destinationImageRepository: Repository<DestinationImageEntity>,
  ) {}

  public async getByDestinationId(id: number) {
    return await this.destinationImageRepository
      .createQueryBuilder('ds')
      .select('ds.image')
      .addSelect('ds.caption')
      .where('ds.destination_id = :id', { id })
      .getMany();
  }
}
