import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super(configService.get('google'));
  }

  async validate(
    accessToken,
    refreshToken,
    profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const user = await this.authService.validateUserByGoogle(profile);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
}
