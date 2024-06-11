import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  exports: [JwtModule],
})
export class JwtConfigModule {}
