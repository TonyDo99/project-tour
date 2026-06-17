import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { response } from './data.transform';

enum EResponse {
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const ctx = context.switchToHttp();
    // const resp = ctx.getResponse<Response>();
    // // console.log('Before route handler...', request);

    // for (const property of request.body) {
    //   if (property === 'name') {
    //     property['name'] = property.name.toString();
    //   }
    // }
    //

    const now = Date.now();
    // return next
    //   .handle()
    //   .pipe(map((data) => response(EResponse.SUCCESS, data, now)));

    return next
      .handle()
      .pipe(map((data) => response(EResponse.SUCCESS, data, now)))
      .pipe(
        catchError((err) =>
          throwError(
            () =>
              new HttpException(
                response(EResponse.SUCCESS, err, now),
                HttpStatus.FORBIDDEN,
              ),
          ),
        ),
      );
  }
}
