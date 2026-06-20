import { ClassSerializerInterceptor } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandleException } from './exception-filters/http.exception';
import { ResponseInterceptor } from './interceptor/logger.interceptor';
import { DestinationLogging } from './logging/common.logging';

// Global = root
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new DestinationLogging(),
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new HandleException());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
