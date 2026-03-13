import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
import { ProductEntity } from '../database/entities/product.entity';
import { ProductFiltersDto } from './dto/product-filters.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(filters: ProductFiltersDto) {
    const page = parseInt(filters.page ?? '1', 10);
    const limit = Math.min(parseInt(filters.limit ?? '12', 10), 100);
    const skip = (page - 1) * limit;

    const where: FindManyOptions<ProductEntity>['where'] = {
      is_published: true,
      ...(filters.family && { family: Like(`%${filters.family}%`) }),
      ...(filters.polymer && { polymer_modification: filters.polymer }),
      ...(filters.reinforcement && { reinforcement: filters.reinforcement }),
      ...(filters.surface && { surface_finish: filters.surface }),
    };

    const [data, total] = await this.productRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { created_at: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findBySlug(slug: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { slug, is_published: true } });
    if (!product) throw new NotFoundException(`Product "${slug}" not found`);
    return product;
  }

  async findRelated(slug: string): Promise<ProductEntity[]> {
    const product = await this.findBySlug(slug);
    return this.productRepository.find({
      where: { family: product.family, is_published: true },
      take: 4,
      order: { created_at: 'DESC' },
    });
  }
}
