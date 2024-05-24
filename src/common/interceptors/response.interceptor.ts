import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponseDto } from '../dto/response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponseDto<T>> | Promise<Observable<ApiResponseDto<T>>> {
    return next.handle().pipe(
      map((data) => {
        if (data === null) {
          throw new NotFoundException('Data not found');
        }
        return {
          status: true,
          data,
          message: 'Request successful',
        };
      }),
    );
  }
}
