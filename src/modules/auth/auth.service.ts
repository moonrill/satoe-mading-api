import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(body: UserLoginDto) {
    return body;
  }

  validatePassword(password: string) {}

  /**
   * Registers a new user.
   *
   * @param {CreateUserDto} body - The user data to create.
   * @return {Promise<{ message: string, user: User }>} An object containing a success message and the created user.
   * @throws {Error} If there is an error creating the user.
   */
  async register(body: CreateUserDto) {
    try {
      const user = await this.userService.createUser(body);
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw error;
    }
  }
}
