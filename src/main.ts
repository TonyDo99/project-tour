import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandleException } from './exception-filters/http.exception';
import { DestinationLogging } from './logging/common.logging';

// Global = root
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new DestinationLogging(),
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HandleException());
  await app.listen(3000);
}
bootstrap();
