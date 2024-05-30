import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
  Matches,
} from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'create-user',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message:
      'Name can only contain letters, numbers, and hyphens, and no spaces',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the permission',
    example: 'Create a new user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The url of the permission',
    example: '/users',
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'The method of the permission',
    example: 'POST',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  method: string;
}
