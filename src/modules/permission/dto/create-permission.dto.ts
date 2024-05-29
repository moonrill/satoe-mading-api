import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'create-user',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
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
}
