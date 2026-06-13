import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    // const userAgent = req.get('user-agent') || '';

    // Ghi log lúc request mới vào
    this.logger.log(`[REQUEST] ${method} ${originalUrl} - IP: ${ip}`);

    // Cho phép request đi tiếp vào hệ thống
    next();
  }
}
