import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from '../database/entities';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>,
  ) {}

  async findAll() {
    return this.systemRepository.find({ where: { isActive: true } });
  }

  async findBySlug(slug: string) {
    const system = await this.systemRepository.findOne({
      where: { slug, isActive: true },
      relations: ['products'],
    });
    if (!system) throw new NotFoundException('System not found');
    return system;
  }

  async create(dto: Partial<System>) {
    const system = this.systemRepository.create(dto);
    return this.systemRepository.save(system);
  }

  async update(id: string, dto: Partial<System>) {
    await this.systemRepository.update(id, dto);
    return this.systemRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.systemRepository.update(id, { isActive: false });
    return { success: true };
  }
}
