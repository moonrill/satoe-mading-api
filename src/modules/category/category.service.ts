import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlug } from 'src/common/utils/slugify';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Creates a new category with the provided data.
   *
   * @param {CreateCategoryDto} createCategoryDto - The data for creating the category.
   * @return {Promise<Category>} The newly created category.
   * @throws {ConflictException} If a category with the same name already exists.
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    // Check if category already exists
    const isCategoryExist = await this.categoryRepository.findOneBy({ name });
    if (isCategoryExist) {
      throw new ConflictException('Category already exists');
    }

    // Create new category
    const newCategory = new Category();
    newCategory.name = name;
    newCategory.slug = generateSlug(name);
    // Save new category
    return await this.categoryRepository.save(newCategory);
  }

  /**
   * Retrieves all categories from the category repository.
   *
   * @return {Promise<Category[]>} A promise that resolves to an array of Category objects.
   */
  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  /**
   * Finds a category by its slug.
   *
   * @param {string} slug - The slug of the category to find.
   * @return {Promise<Category>} A promise that resolves to the found category, or throws a NotFoundException if the category is not found.
   */
  async findOne(slug: string): Promise<Category> {
    // Find category
    const category = await this.categoryRepository.findOneBy({ slug });

    // Check if category exists
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  /**
   * Updates a category with the given slug using the provided data.
   *
   * @param {string} slug - The slug of the category to update.
   * @param {UpdateCategoryDto} updateCategoryDto - The data to update the category with.
   * @return {Promise<Category>} The updated category.
   * @throws {ConflictException} If a category with the same name already exists.
   */
  async update(
    slug: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    // Find category
    const category = await this.findOne(slug);

    const { name } = updateCategoryDto;

    if (name) {
      // Check if category name already exists
      const isCategoryExist = await this.categoryRepository.findOneBy({ name });
      if (isCategoryExist) {
        throw new ConflictException('Category already exists');
      }

      // Update category
      category.name = name;
      category.slug = generateSlug(name);
    }

    return await this.categoryRepository.save(category);
  }

  /**
   * Removes a category with the given slug from the category repository.
   *
   * @param {string} slug - The slug of the category to remove.
   * @return {Promise<Category>} A promise that resolves to the removed category.
   */
  async remove(slug: string): Promise<Category> {
    // Find category
    const category = await this.findOne(slug);

    // Remove category
    return await this.categoryRepository.softRemove(category);
  }
}
