import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketEntity } from '../database/entities/market.entity';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(MarketEntity)
    private marketRepository: Repository<MarketEntity>,
  ) {}

  findAll(): Promise<MarketEntity[]> {
    return this.marketRepository.find({ order: { country_name: 'ASC' } });
  }
}
