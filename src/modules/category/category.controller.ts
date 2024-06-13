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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Success create category' })
  @ApiConflictResponse({ description: 'Category already exists' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Success get all categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':slug')
  @ApiOkResponse({ description: 'Success get category by slug' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async findOne(@Param('slug') slug: string) {
    return await this.categoryService.findOne(slug);
  }

  @Patch(':slug')
  @ApiOkResponse({ description: 'Success update category' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiConflictResponse({ description: 'Category already exists' })
  async update(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(slug, updateCategoryDto);
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Success delete category' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async remove(@Param('slug') slug: string) {
    return await this.categoryService.remove(slug);
  }
}
