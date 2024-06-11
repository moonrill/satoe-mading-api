import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { JwtConfigModule } from 'src/config/jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
