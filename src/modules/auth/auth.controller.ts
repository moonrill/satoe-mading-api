import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return await this.authService.login(body);
  }

  @Post('register')
  @Public()
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    return req.user;
  }
}
