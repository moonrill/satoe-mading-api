import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their identifier.
   *
   * @param {string} identifier - The identifier of the user to find. It can be the id, username, email, NIS, or NIP.
   * @return {Promise<User | any>} A promise that resolves to the found user, or any other value if the user is not found.
   */
  async findOne(identifier: string): Promise<User> {
    let user: User;

    if (isUuid(identifier)) {
      // If the identifier is a valid UUID, query by id.
      user = await this.userRepository.findOne({ where: { id: identifier } });
    } else {
      // If the identifier is not a valid UUID, query by other fields.
      user = await this.userRepository.findOne({
        where: [
          { username: identifier },
          { email: identifier },
          { nis: identifier },
          { nip: identifier },
        ],
      });
    }

    if (!user) {
      throw new NotFoundException();
    }

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
    const isUserExists = await this.userRepository.findOne({
      where: [
        { username: body.username },
        { email: body.email },
        { nis: body.nis },
        { nip: body.nip },
      ],
    });

    // Throw error if username or email already exists
    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    // Create new User
    const user = this.userRepository.create(body);
    return await this.userRepository.save(user);
  }
}
