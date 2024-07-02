import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMimeType,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Username of the User',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Email of the User',
    maxLength: 100,
    example: 'johndoe@me.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Password of the User',
    minLength: 8,
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    required: false,
    type: File,
    description: 'Avatar of the User',
    example: 'avatar.png',
  })
  @IsOptional()
  @IsMimeType()
  avatar: string;
}
