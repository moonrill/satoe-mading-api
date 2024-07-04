import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserLoginDto } from './dto/login.dto';
import { GooglePayload } from './type/google-profile.type';
import { UserType } from './type/user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
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
   * Validates a user by their email and password.
   *
   * @param {string} email - The email of the user to validate. It can be the id, username, email, NIS, or NIP.
   * @param {string} password - The password to validate against the user's password.
   * @return {Promise<User | null>} A promise that resolves to the validated user if the credentials are valid, or null if the user does not exist or the passwords do not match.
   *
   * - If the user does not exist or the passwords do not match, an UnauthorizedException is thrown.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    // First, we try to find the user in the database.
    const user = await this.userRepository.findOneBy({ email });

    // If the user does not exist or the passwords do not match, we throw an UnauthorizedException.
    if (!user || !this.comparePassword(password, user.password)) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    // If the user exists and the passwords match, we return the user.
    return user;
  }

  /**
   * Authenticates a user by validating their credentials and generating a JWT token.
   *
   * @param {UserLoginDto} userLoginDto - The user login data containing the email and password.
   * @return {Promise<UserType>} - A promise that resolves to an object containing the login status,
   * user details, and access token.
   * @throws {UnauthorizedException} - If the provided credentials are invalid.
   */
  async login(userLoginDto: UserLoginDto): Promise<UserType> {
    // Validate the user's credentials.
    const user = await this.validateUser(
      userLoginDto.email,
      userLoginDto.password,
    );

    // Create the payload for the JWT token.
    const payload = {
      email: user.email,
      sub: user.id,
    };

    // Generate the access and refresh tokens.
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Return the login status, user details, and access token.
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Authenticates a user by validating their Google credentials and generating JWT tokens.
   *
   * @param {object} user - The user object containing the user's email and ID.
   * @return {Promise<UserType>} - A promise that resolves to an object containing the login
   * status, user details, and access and refresh tokens.
   */
  async loginByGoogle(user: any): Promise<UserType> {
    // Create the payload for the JWT tokens.
    const payload = {
      email: user.email,
      sub: user.id,
    };

    // Generate the access and refresh tokens.
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Return the login status, user details, and access and refresh tokens.
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Registers a new user.
   *
   * @param {CreateUserDto} createUserDto - The user data to create.
   * @return {Promise<User>} - The created user.
   * @throws {ConflictException} - If the user already exists.
   */
  async register(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const isUserExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (isUserExists) {
      // Throw error if user email already exists
      throw new ConflictException('User already exists');
    }

    // TODO: validate email address before saving

    // Create new User
    const user = this.userRepository.create(createUserDto);
    // Save and return user
    return await this.userRepository.save(user);
  }

  /**
   * Checks if an email already exists in the database.
   *
   * @param {string} email - The email to check.
   * @return {Promise<{ isEmailExists: boolean }>} - An object indicating if the email exists.
   */
  async checkEmail(email: string): Promise<{ isEmailExists: boolean }> {
    // Find user with email
    const user = await this.userRepository.findOne({
      where: [{ email }],
    });

    // Return whether email exists or not
    return {
      isEmailExists: !!user,
    };
  }

  /**
   * Validates a user by their Google profile data.
   *
   * @param {GooglePayload} profile - The user's Google profile data.
   * @return {Promise<User | null>} The validated user, or null if the user doesn't exist.
   */
  async validateUserByGoogle(profile: GooglePayload): Promise<User | null> {
    // Extract relevant information from the profile data
    const { displayName, emails, photos } = profile;

    // Find user with the provided email
    let user = await this.userRepository.findOneBy({
      email: emails[0].value,
    });

    // If user doesn't exist, create a new user with the provided data
    if (!user) {
      user = this.userRepository.create({
        email: emails[0].value,
        name: displayName,
        avatar: photos[0].value,
      });
      await this.userRepository.save(user);
    }

    // Return the validated user
    return user;
  }
}
