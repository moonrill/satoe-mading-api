import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Compares a password with a user's password using bcrypt.
   *
   * @param {string} password - The password to compare.
   * @param {string} userPassword - The user's password to compare against.
   * @return {boolean} Returns true if the passwords match, false otherwise.
   */
  comparePassword(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  /**
   * Validates a user by their identifier and password.
   *
   * @param {string} identifier - The identifier of the user to validate. It can be the username, email, NIS, or NIP.
   * @param {string} password - The password to validate against the user's password.
   * @return {Promise<User | null>} A promise that resolves to the validated user if the credentials are valid, or null if the user does not exist or the passwords do not match.
   */
  async validateUser(
    identifier: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOne(identifier);

    return user && this.comparePassword(password, user.password) ? user : null;
  }

  /**
   * Generates a JSON Web Token (JWT) for the given user.
   *
   * @param {User} user - The user for whom the token is being generated.
   * @return {string} The generated JWT.
   */
  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
  }

  /**
   * Authenticates a user by validating their credentials and generating a JWT token.
   *
   * @param {UserLoginDto} body - The user login data containing the identifier and password.
   * @return {Promise<object>} - A promise that resolves to an object containing the login status, user details, and access token.
   * @throws {UnauthorizedException} - If the provided credentials are invalid.
   */
  async login(body: UserLoginDto): Promise<object> {
    const user = await this.validateUser(body.identifier, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);

    return {
      user,
      access_token: token,
    };
  }

  /**
   * Registers a new user.
   *
   * @param {CreateUserDto} userData - The user data to create.
   * @returns {Promise<User>} An object containing a success message and the created user.
   * @throws {Error} If there is an error creating the user.
   */
  async register(userData: CreateUserDto): Promise<User> {
    return await this.userService.createUser(userData);
  }
}
