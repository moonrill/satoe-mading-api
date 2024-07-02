import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    required: true,
    description: 'The email address of the user.',
    type: String,
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The password to login.',
    type: String,
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}
