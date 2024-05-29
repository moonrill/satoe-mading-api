import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMimeType,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'NIS of the user if role is Siswa',
    maxLength: 11,
    example: '1234567890',
  })
  @IsOptional()
  @IsNumberString()
  @MaxLength(11)
  nis: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'NIP of the user if role is Guru',
    maxLength: 19,
    example: '12345678901234567',
  })
  @IsOptional()
  @IsNumberString()
  @MaxLength(19)
  nip: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Username of the User',
    maxLength: 20,
    example: 'johndoe',
  })
  @IsNotEmpty()
  @Matches(/^\S*$/, { message: 'username cannot contain spaces' })
  @MaxLength(20)
  username: string;

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
