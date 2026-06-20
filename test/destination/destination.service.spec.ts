import { DestinationImageService } from '../../src/destination-image/destination-image.service';
import { DestinationService } from '../../src/destination/destination.service';
import { DestinationEntity, DestinationImageEntity } from '../../src/entities';
import { Repository } from 'typeorm';

describe('Unit testing destination controller', () => {
  let destinationService: DestinationService;
  let destinationImageService: DestinationImageService;
  let destinationRepository: Repository<DestinationEntity>;
  let destinationImageEntity: Repository<DestinationImageEntity>;

  beforeEach(() => {
    destinationRepository = new Repository(DestinationEntity, undefined);
    destinationImageService = new DestinationImageService(
      destinationImageEntity,
    );
    destinationService = new DestinationService(
      destinationRepository,
      destinationImageService,
    );
  });

  describe('destination service', () => {
    it('should run destination list success', async () => {
      // 1. Gọi đến
      // 2. Mong muốn kết quả trả về
      const result = {
        id: 1,
        name: 'Hong kong',
        slug: '',
        description: 'Hong Kong travel',
        country: 'Hong Kong',
        city: 'Hong Kong',
        isPopular: true,
        createdAt: new Date('2026-06-13 11:20:55.696554'),
        updatedAt: new Date('2026-06-13 11:20:55.696554'),
      };

      jest.spyOn(destinationRepository, 'find').mockResolvedValue([result]);

      expect(await destinationService.list()).toMatchObject([result]);
    });
  });
});
