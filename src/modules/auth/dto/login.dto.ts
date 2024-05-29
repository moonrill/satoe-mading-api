import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    required: true,
    description:
      'The identifier of the user to login. It can be the username, email, NIS, or NIP.',
    type: String,
    example: 'johndoe',
  })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({
    required: true,
    description: 'The password to login.',
    type: String,
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}
