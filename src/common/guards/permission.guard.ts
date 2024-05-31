import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { match } from 'path-to-regexp';
import { UserService } from 'src/modules/user/user.service';
import {
  IS_PERMISSION_PUBLIC_KEY,
  IS_ROUTE_PUBLIC_KEY,
} from '../decorators/public.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  /**
   * Determines if the user can activate the given route.
   *
   * @param {ExecutionContext} context - The execution context of the route.
   * @return {Promise<boolean>} A promise that resolves to true if the user can activate the route,
   * and false otherwise. Throws an UnauthorizedException if the user is not logged in, and a
   * ForbiddenException if the user does not have permission to access the resource.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the 'isPermissionPublic' metadata from the route handler
    const isPermissionPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PERMISSION_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    // Get the 'isRoutePublic' metadata from the route handler
    const isRoutePublic = this.reflector.getAllAndOverride<boolean>(
      IS_ROUTE_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If the permission is public or the route is public, allow access
    if (isPermissionPublic || isRoutePublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // If the user is not logged in, throw an UnauthorizedException
    if (!user) {
      throw new UnauthorizedException(
        'You need to be logged in to access this resource',
      );
    }

    // Get the original URL and method from the request
    const originalUrl = request.url;
    const method = request.method;

    // Define the URL prefix
    const prefix = '/api/v1';

    // Remove the prefix from the URL
    const url = originalUrl.startsWith(prefix)
      ? originalUrl.slice(prefix.length)
      : originalUrl;

    // Get the user from the database
    const userEntity = await this.userService.findOne(user?.id);

    // Check if the user has permission to access the resource
    const hasPermission = userEntity.role?.permissions?.some(
      (permission) =>
        match(permission.url)(url) && permission.method === method,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
