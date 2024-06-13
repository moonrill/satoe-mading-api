import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('Role')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Success create role' })
  @ApiConflictResponse({ description: 'Role already exists' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiNotFoundResponse({ description: 'Some permission not found' })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Success get all roles' })
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success get role by id' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Success update role' })
  @ApiConflictResponse({ description: 'Role already exists' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiNotFoundResponse({ description: 'Some permission not found' })
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Success delete role',
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(+id);
  }
}
