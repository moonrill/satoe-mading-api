import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_ROUTE_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Determines if the route can be activated.
   *
   * @param {ExecutionContext} context - The execution context.
   * @return {boolean | Promise<boolean> | Observable<boolean>} - Returns a boolean, a promise of a boolean, or an observable of a boolean.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the 'isRoutePublic' metadata from the route handler
    const isRoutePublic = this.reflector.getAllAndOverride<boolean>(
      IS_ROUTE_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If the route is public, allow access
    if (isRoutePublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'You need to be logged in to access this resource',
        )
      );
    }
    return user;
  }
}
