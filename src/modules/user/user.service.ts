import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their email.
   *
   * @param {string} email - The email of the user to find.
   * @return {Promise<User | any>} A promise that resolves to the found user, or any other value if the user is not found.
   */
  async findOne(email: string): Promise<User> {
    // Find user by email in database
    const user = await this.userRepository.findOneBy({ email });

    // Throw error if user is not found
    if (!user) {
      throw new NotFoundException();
    }

    // Return user
    return user;
  }

  /**
   * Creates a new user.
   *
   * @param {CreateUserDto} body - The user data to create.
   * @return {Promise<User>} The created user.
   * @throws {ConflictException} If the user already exists.
   */
  async createUser(body: CreateUserDto) {
    // Check if user is already exists
    const isUserExists = await this.userRepository.findOneBy({
      email: body.email,
    });

    // Throw error if username or email already exists
    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    // Create new User
    const user = this.userRepository.create(body);
    // Save and return user
    return await this.userRepository.save(user);
  }
}
