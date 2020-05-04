import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
}
class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    // TODO
    const categoryRepository = getRepository(Category);
    const existingCategory = await categoryRepository.findOne({
      where: { title },
    });

    if (!existingCategory) {
      const newCategory = categoryRepository.create({
        title,
      });
      await categoryRepository.save(newCategory);
      return newCategory;
    }

    await categoryRepository.save(existingCategory);
    return existingCategory;
  }
}

export default CreateCategoryService;
