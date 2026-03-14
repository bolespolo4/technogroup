import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from '../database/entities';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market)
    private marketRepository: Repository<Market>,
  ) {}

  async findAll() {
    return this.marketRepository.find({ where: { isActive: true } });
  }

  async findOne(id: string) {
    const market = await this.marketRepository.findOne({ where: { id } });
    if (!market) throw new NotFoundException('Market not found');
    return market;
  }

  async create(dto: Partial<Market>) {
    const market = this.marketRepository.create(dto);
    return this.marketRepository.save(market);
  }

  async update(id: string, dto: Partial<Market>) {
    await this.marketRepository.update(id, dto);
    return this.marketRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.marketRepository.update(id, { isActive: false });
    return { success: true };
  }
}
