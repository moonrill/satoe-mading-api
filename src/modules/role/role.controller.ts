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

  @ApiCreatedResponse({
    description: 'The role has been successfully created.',
  })
  @ApiConflictResponse({ description: 'Role already exists.' })
  @ApiNotFoundResponse({ description: 'Permission not found.' })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @ApiOkResponse({ description: 'The roles have been successfully listed.' })
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @ApiOkResponse({ description: 'The role has been successfully found.' })
  @ApiNotFoundResponse({ description: 'Role not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(+id);
  }

  @ApiOkResponse({ description: 'The role has been successfully updated.' })
  @ApiConflictResponse({ description: 'Role already exists.' })
  @ApiNotFoundResponse({ description: 'Role not found.' })
  @ApiNotFoundResponse({ description: 'Permission not found.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(+id, updateRoleDto);
  }

  @ApiNoContentResponse({
    description: 'The role has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Role not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(+id);
  }
}
