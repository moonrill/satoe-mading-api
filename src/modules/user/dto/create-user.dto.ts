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
  @IsOptional()
  @IsNumberString()
  @MaxLength(11)
  nis: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(19)
  nip: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @Matches(/^\S*$/, { message: 'username cannot contain spaces' })
  @MaxLength(20)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsMimeType()
  avatar: string;
}
