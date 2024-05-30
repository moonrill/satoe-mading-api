import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  url?: string;

  @IsOptional()
  method?: string;
}
