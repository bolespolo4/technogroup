import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemEntity } from '../database/entities/system.entity';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(SystemEntity)
    private systemRepository: Repository<SystemEntity>,
  ) {}

  findAll(): Promise<SystemEntity[]> {
    return this.systemRepository.find({ order: { name: 'ASC' } });
  }

  async findBySlug(slug: string): Promise<SystemEntity> {
    const system = await this.systemRepository.findOne({ where: { slug } });
    if (!system) throw new NotFoundException(`System "${slug}" not found`);
    return system;
  }
}
