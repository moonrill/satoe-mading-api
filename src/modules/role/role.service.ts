import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleWithPermissionsDto } from './dto/role-with-permissions.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
  ) {}

  /**
   * Creates a new role with the given name and permissions.
   *
   * @param {CreateRoleDto} dto - An object containing the name and permissions of the role.
   * @return {Promise<Role>} A promise that resolves to the created role.
   */
  async create(dto: CreateRoleDto): Promise<Role> {
    // Destruct dto
    const { name, permissions } = dto;

    // Check if role already exists
    const isRoleExist = await this.roleRepository.findOneBy({ name });
    if (isRoleExist) {
      throw new ConflictException('Role already exists');
    }

    // Create new role
    const role = new Role();
    role.name = name;

    // Check if permissions exist
    if (permissions?.length > 0) {
      // Find and validate permissions
      const foundPermissions =
        await this.permissionService.findAndValidatePermissions(permissions);

      // Set permissions to role
      role.permissions = foundPermissions;
    }

    // Return saved role
    return this.roleRepository.save(role);
  }

  /**
   * Retrieves all roles from the role repository.
   *
   * @return {Promise<Role[]>} A promise that resolves to an array of Role objects.
   */
  async findAll(): Promise<RoleWithPermissionsDto[]> {
    // Find all roles
    const roles = await this.roleRepository.find();

    // Map roles to RoleWithPermissionsDto
    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      permissions: role.permissions.map((permission) => permission.action),
    }));
  }

  /**
   * Retrieves a role from the role repository by its ID.
   *
   * @param {number} id - The ID of the role to retrieve.
   * @return {Promise<Role>} A promise that resolves to the retrieved role.
   * @throws {NotFoundException} If the role with the given ID is not found.
   */
  async findOne(id: number): Promise<Role> {
    // Find role
    const role = await this.roleRepository.findOneBy({ id });

    // Check if role exists
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Return role
    return role;
  }

  /**
   * Validates if a role with the given name and id already exists in the database.
   *
   * @param {string} name - The name of the role to validate.
   * @param {number} id - The id of the role to validate.
   * @return {Promise<void>} - A promise that resolves if the role does not exist, or rejects with a ConflictException if the role already exists.
   */
  async validateRoleName(name: string, id: number): Promise<void> {
    // Check if role already exists
    const isRoleExists = await this.roleRepository.findOne({
      where: { name, id: Not(Equal(id)) },
    });

    // Throw error if role already exists
    if (isRoleExists) {
      throw new ConflictException('Role already exists');
    }
  }

  /**
   * Updates a role with the given ID using the provided data.
   *
   * @param {number} id - The ID of the role to update.
   * @param {UpdateRoleDto} dto - The data to update the role with.
   * @return {Promise<Role>} - A promise that resolves to the updated role.
   */
  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    // Destruct dto
    const { name, permissions } = dto;

    // Check if role exists
    const role = await this.findOne(id);

    if (name) {
      // Check if name already exists
      await this.validateRoleName(name, id);

      role.name = name;
    }

    if (permissions?.length > 0) {
      // Find and validate permissions
      const foundPermissions =
        await this.permissionService.findAndValidatePermissions(permissions);

      // Set permissions to role
      role.permissions = foundPermissions;
    }

    // Save the updated role
    return this.roleRepository.save(role);
  }

  /**
   * Removes a role from the database by its ID.
   *
   * @param {number} id - The ID of the role to remove.
   * @return {Promise<Role>} A promise that resolves to the removed role.
   */
  async remove(id: number): Promise<Role> {
    // Find role
    const role = await this.findOne(id);

    // Remove role
    return this.roleRepository.remove(role);
  }
}
