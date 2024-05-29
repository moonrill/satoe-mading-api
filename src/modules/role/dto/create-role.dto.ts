import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'admin',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'List of permissions for the role. The values is array of id of permission.',
    example: ['1', '2', '3'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  permissions: string[];
}
