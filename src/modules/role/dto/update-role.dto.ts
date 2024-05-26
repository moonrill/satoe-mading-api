import { PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];
}
