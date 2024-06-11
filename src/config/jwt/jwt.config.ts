import { JwtModuleOptions } from '@nestjs/jwt';
import config from '../environments';

export const jwtConfig: JwtModuleOptions = {
  secret: config.jwt.secret,
  signOptions: { expiresIn: config.jwt.expiresIn },
};
