import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { MediaPostEntity } from '../database/entities/media-post.entity';
import { ProjectEntity } from '../database/entities/project.entity';
import { MediaFiltersDto } from './dto/media-filters.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaPostEntity)
    private mediaRepository: Repository<MediaPostEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAll(filters: MediaFiltersDto) {
    const page = parseInt(filters.page ?? '1', 10);
    const limit = Math.min(parseInt(filters.limit ?? '12', 10), 100);
    const skip = (page - 1) * limit;

    const where: FindManyOptions<MediaPostEntity>['where'] = {
      ...(filters.type && { type: filters.type }),
    };

    const [data, total] = await this.mediaRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { published_at: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findBySlug(slug: string): Promise<MediaPostEntity> {
    const post = await this.mediaRepository.findOne({ where: { slug } });
    if (!post) throw new NotFoundException(`Media post "${slug}" not found`);
    return post;
  }

  getFeaturedProjects(): Promise<ProjectEntity[]> {
    return this.projectRepository.find({
      where: { is_featured: true },
      order: { is_international: 'DESC', year: 'DESC' },
      take: 4,
    });
  }
}
