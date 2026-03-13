import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalHubController } from './technical-hub.controller';
import { TechnicalHubService } from './technical-hub.service';
import { ProductEntity } from '../database/entities/product.entity';
import { SystemEntity } from '../database/entities/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, SystemEntity])],
  controllers: [TechnicalHubController],
  providers: [TechnicalHubService],
})
export class TechnicalHubModule {}
