import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaItem, MediaType } from '../database/entities';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaItem)
    private mediaRepository: Repository<MediaItem>,
  ) {}

  async findAll(type?: MediaType) {
    const where: any = { isActive: true };
    if (type) where.type = type;
    return this.mediaRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findFeatured() {
    return this.mediaRepository.find({ where: { featured: true, isActive: true }, order: { createdAt: 'DESC' }, take: 5 });
  }

  async findBySlug(slug: string) {
    const item = await this.mediaRepository.findOne({ where: { slug, isActive: true } });
    if (!item) throw new NotFoundException('Media item not found');
    return item;
  }

  async create(dto: Partial<MediaItem>) {
    const item = this.mediaRepository.create(dto);
    return this.mediaRepository.save(item);
  }

  async update(id: string, dto: Partial<MediaItem>) {
    await this.mediaRepository.update(id, dto);
    return this.mediaRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.mediaRepository.update(id, { isActive: false });
    return { success: true };
  }
}
