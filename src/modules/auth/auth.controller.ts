import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';

@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public({ route: true })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Login success and return access token' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or invalid credentials',
  })
  async login(@Body() body: UserLoginDto) {
    return await this.authService.login(body);
  }

  @Public({ route: true })
  @Post('register')
  @ApiCreatedResponse({ description: 'Register success and return user data' })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Public({ route: false, permission: true })
  @Get('profile')
  @ApiOkResponse({ description: 'Success get user profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized or invalid token' })
  async getUser(@Req() req) {
    return req.user;
  }

  @Public({ route: true, permission: true })
  @Post('check-email')
  @ApiOkResponse({ description: 'Success check email' })
  async checkEmail(@Body() { email }) {
    return await this.authService.checkEmail(email);
  }

  @Public({ route: true, permission: true })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async google() {}

  @Public({ route: true, permission: true })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    return await this.authService.loginByGoogle(req.user);
  }
}
