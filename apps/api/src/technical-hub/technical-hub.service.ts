import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ProductEntity } from '../database/entities/product.entity';
import { SystemEntity } from '../database/entities/system.entity';

interface SearchParams {
  q?: string;
  type?: 'product' | 'system' | 'document';
}

@Injectable()
export class TechnicalHubService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(SystemEntity)
    private systemRepository: Repository<SystemEntity>,
  ) {}

  async search(params: SearchParams) {
    const { q = '', type } = params;
    // Escape SQL LIKE wildcards to prevent unexpected pattern matching
    const safeQ = q.replace(/[%_\\]/g, '\\$&');
    const results: { products: ProductEntity[]; systems: SystemEntity[] } = {
      products: [],
      systems: [],
    };

    if (!type || type === 'product') {
      results.products = await this.productRepository.find({
        where: [
          { name: Like(`%${safeQ}%`), is_published: true },
          { description: Like(`%${safeQ}%`), is_published: true },
        ],
        take: 10,
      });
    }

    if (!type || type === 'system') {
      results.systems = await this.systemRepository.find({
        where: [
          { name: Like(`%${safeQ}%`) },
          { description: Like(`%${safeQ}%`) },
        ],
        take: 10,
      });
    }

    return results;
  }
}
