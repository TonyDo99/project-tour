import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationImageModule } from 'src/destination-image/destination-image.module';
import { LoggerModule } from 'src/logging/logging.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { DestinationEntity } from '../entities/destination.entity';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DestinationEntity]),
    DestinationImageModule,
    LoggerModule,
  ],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
        path: 'destination/:id',
        method: RequestMethod.GET,
      })
      .forRoutes('destination');
  }
}
