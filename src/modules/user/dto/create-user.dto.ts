import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMimeType,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enum/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'NIS of the user if role is Siswa',
    maxLength: 11,
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
  })
  @IsOptional()
  @IsNumberString()
  @MaxLength(19)
  nip: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Role for User',
    enumName: 'UserRole',
    enum: UserRole,
    default: UserRole.SISWA,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Username of the User',
    maxLength: 20,
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
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    required: false,
    type: File,
    description: 'Avatar of the User',
  })
  @IsOptional()
  @IsMimeType()
  avatar: string;
}
