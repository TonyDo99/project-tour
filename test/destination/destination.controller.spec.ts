import { DestinationImageService } from '../../src/destination-image/destination-image.service';
import { DestinationController } from '../../src/destination/destination.controller';
import { DestinationService } from '../../src/destination/destination.service';
import { DestinationEntity, DestinationImageEntity } from '../../src/entities';
import { Repository } from 'typeorm';

describe('Unit testing destination controller', () => {
  let destinationController: DestinationController;
  let destinationService: DestinationService;
  let destinationImageService: DestinationImageService;
  let destinationRepository: Repository<DestinationEntity>;
  let destinationImageEntity: Repository<DestinationImageEntity>;

  beforeEach(() => {
    destinationImageService = new DestinationImageService(
      destinationImageEntity,
    );
    destinationService = new DestinationService(
      destinationRepository,
      destinationImageService,
    );
    destinationController = new DestinationController(destinationService);
  });

  describe('destination controller', () => {
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

      jest.spyOn(destinationService, 'list').mockResolvedValue([result]);

      expect(await destinationController.list()).toMatchObject([result]);
    });
  });
});
