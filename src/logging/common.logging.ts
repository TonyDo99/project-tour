import { ConsoleLogger } from '@nestjs/common';
import { DestinationEntity } from 'src/entities';

// Custom logging
export class DestinationLogging extends ConsoleLogger {
  // Custom log for destination
  logDestination(message: string, data: DestinationEntity, error?: Error) {
    if (error) {
      this.error({
        message: error.message,
        data: null,
        error,
      });
    } else {
      this.log({
        message,
        data,
        error: null,
      });
    }
  }
}
