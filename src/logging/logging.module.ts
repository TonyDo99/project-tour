import { Module } from '@nestjs/common';
import { DestinationLogging } from './common.logging';

@Module({
  providers: [DestinationLogging],
  exports: [DestinationLogging],
})
export class LoggerModule {}
