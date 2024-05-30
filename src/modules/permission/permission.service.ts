import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  /**
   * Finds and validates the permissions based on the given permission IDs.
   *
   * @param {string[]} permissionIds - An array of permission IDs to search for.
   * @return {Promise<Permission[]>} A promise that resolves to an array of found permissions.
   * @throws {NotFoundException} If some of the permissions are not found.
   */
  async findAndValidatePermissions(
    permissionIds: string[],
  ): Promise<Permission[]> {
    // Find permissions that are in the array of permission IDs
    const foundPermissions = await this.permissionRepository.find({
      where: { id: In(permissionIds) },
    });

    // Check if all permissions are found
    if (foundPermissions.length !== permissionIds.length) {
      throw new NotFoundException('Some permissions not found');
    }

    // Return found permissions
    return foundPermissions;
  }

  /**
   * Creates a new permission with the specified action.
   *
   * @param {CreatePermissionDto} dto - The action associated with the permission.
   * @return {Promise<Permission>} A promise that resolves to the created permission.
   * @throws {ConflictException} If a permission with the same action already exists.
   */
  async create(dto: CreatePermissionDto): Promise<Permission> {
    // Check if permission already exists
    const isPermissionExist = await this.permissionRepository.findOneBy({
      name: dto.name,
    });

    // Throw error if permission already exists
    if (isPermissionExist) {
      throw new ConflictException('Permission already exists');
    }

    // Create new Permission
    const permission = this.permissionRepository.create(dto);

    // Save and return permission
    return this.permissionRepository.save(permission);
  }

  /**
   * Retrieves all permissions from the permission repository.
   *
   * @return {Promise<Permission[]>} A promise that resolves to an array of Permission objects.
   */
  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  /**
   * Retrieves a permission from the permission repository by its ID.
   *
   * @param {number} id - The ID of the permission to retrieve.
   * @return {Promise<Permission>} A promise that resolves to the retrieved permission.
   * @throws {NotFoundException} If the permission with the given ID is not found.
   */
  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOneBy({ id });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  /**
   * Updates a permission with the given ID using the provided data.
   *
   * @param {number} id - The ID of the permission to update.
   * @param {UpdatePermissionDto} dto - The data to update the permission with.
   * @return {Promise<Permission>} A promise that resolves to the updated permission.
   */
  async update(id: number, dto: UpdatePermissionDto): Promise<Permission> {
    // Find permission
    const permission = await this.findOne(id);
    // Destruct dto
    const { name, description, url, method } = dto;

    // Update only the provided fields
    if (name) {
      permission.name = name;
    }
    if (description) {
      permission.description = description;
    }
    if (url) {
      permission.url = url;
    }
    if (method) {
      permission.method = method;
    }

    return this.permissionRepository.save(permission);
  }

  /**
   * Removes a permission from the database by its ID.
   *
   * @param {number} id - The ID of the permission to remove.
   * @return {Promise<Permission>} A promise that resolves to the removed permission.
   */
  async remove(id: number): Promise<Permission> {
    const permission = await this.findOne(id);

    return this.permissionRepository.remove(permission);
  }
}
