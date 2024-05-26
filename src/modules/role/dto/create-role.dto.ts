import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the role' })
  name: string;

  @IsOptional()
  @ApiProperty({
    description:
      'List of permissions for the role. The values is array of id of permission.',
  })
  @IsArray()
  permissions: string[];
}
