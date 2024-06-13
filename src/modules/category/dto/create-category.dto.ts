import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Category 1',
    description: 'Name of the category',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
