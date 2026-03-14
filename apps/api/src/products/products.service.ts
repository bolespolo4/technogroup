import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../database/entities';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(filters: FilterProductsDto) {
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.systems', 'system')
      .where('product.isActive = :isActive', { isActive: true });

    if (filters.family) {
      query.andWhere('product.family = :family', { family: filters.family });
    }
    if (filters.polymer) {
      query.andWhere('product.polymer = :polymer', { polymer: filters.polymer });
    }
    if (filters.reinforcement) {
      query.andWhere('product.reinforcement = :reinforcement', { reinforcement: filters.reinforcement });
    }
    if (filters.surface) {
      query.andWhere('product.surface = :surface', { surface: filters.surface });
    }
    if (filters.search) {
      const sanitized = filters.search.replace(/[%_\\]/g, '\\$&');
      query.andWhere('(product.name ILIKE :search OR product.description ILIKE :search)', { search: `%${sanitized}%` });
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    query.skip((page - 1) * limit).take(limit);

    const [items, total] = await query.getManyAndCount();
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: { slug, isActive: true },
      relations: ['systems'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto) {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    await this.productRepository.update(id, dto);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.productRepository.update(id, { isActive: false });
    return { success: true };
  }
}
