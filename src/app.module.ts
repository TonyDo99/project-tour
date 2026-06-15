import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DestinationModule } from './destination/destination.module';
import { TourModule } from './tour/tour.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 44321,
      username: 'postgres',
      password: 'pwd',
      database: 'tour_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    TourModule,
    DestinationModule,
    AuthModule,
  ],
})
export class AppModule {}
