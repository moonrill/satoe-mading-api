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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Login success and return JWT token.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  async login(@Body() body: UserLoginDto) {
    return await this.authService.login(body);
  }

  @Post('register')
  @Public()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed.',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists.',
  })
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    return req.user;
  }
}
