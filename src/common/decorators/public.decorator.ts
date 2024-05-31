import { SetMetadata } from '@nestjs/common';

// Define metadata keys
export const IS_ROUTE_PUBLIC_KEY = 'isRoutePublic';
export const IS_PERMISSION_PUBLIC_KEY = 'isPermissionPublic';

/**
 * Options for the public decorator.
 */
export interface PublicOptions {
  /**
   * Whether the route is public. Defaults to true.
   */
  route?: boolean;
  /**
   * Whether the permission is public. Defaults to false.
   */
  permission?: boolean;
}

/**
 * A decorator that marks a route or permission as public.
 *
 * @param {PublicOptions} options - The options for the public decorator.
 * @returns {MethodDecorator} - The decorator function.
 *
 * Default options: { route: false, permission: false }
 */
export const Public = (
  options: PublicOptions = { route: false, permission: false },
): MethodDecorator => {
  return (
    target: object,
    key?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    SetMetadata(IS_ROUTE_PUBLIC_KEY, options.route)(target, key, descriptor);
    SetMetadata(IS_PERMISSION_PUBLIC_KEY, options.permission)(
      target,
      key,
      descriptor,
    );
  };
};
