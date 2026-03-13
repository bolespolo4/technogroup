import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { MarketEntity } from '../database/entities/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketEntity])],
  controllers: [MarketsController],
  providers: [MarketsService],
})
export class MarketsModule {}
