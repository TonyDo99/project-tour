import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../entities/tour.entity';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  async list() {
    return this.tourRepository.find({ relations: { destination: true } });
  }

  async getById(id: number) {
    return this.tourRepository.findOne({ where: { id }, relations: { destination: true } });
  }

  async create(tourInfo: Partial<Tour> & { destinationId?: number }) {
    if (!tourInfo.slug) {
      tourInfo.slug = tourInfo.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
    }
    const tour = this.tourRepository.create(tourInfo);
    if (tourInfo.destinationId) {
      tour.destination = { id: tourInfo.destinationId } as any;
    }
    return this.tourRepository.save(tour);
  }

  async delete(id: number) {
    await this.tourRepository.delete(id);
    return { deleted: true };
  }

  async update(id: number, newTourInfo: Partial<Tour>) {
    await this.tourRepository.update(id, newTourInfo);
    return this.getById(id);
  }
}
