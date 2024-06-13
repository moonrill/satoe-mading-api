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
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

@ApiTags('Permission')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Success create permission' })
  @ApiConflictResponse({ description: 'Permission already exists' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async create(@Body() dto: CreatePermissionDto) {
    return await this.permissionService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Success get all permissions' })
  async findAll() {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success get permission by id' })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  async findOne(@Param('id') id: string) {
    return await this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Success update permission' })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiConflictResponse({ description: 'Permission already exists' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return await this.permissionService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Success delete permission' })
  @ApiNotFoundResponse({ description: 'Permission not found' })
  async remove(@Param('id') id: string) {
    return await this.permissionService.remove(+id);
  }
}
