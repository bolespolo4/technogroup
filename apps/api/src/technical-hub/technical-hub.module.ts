import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalHubController } from './technical-hub.controller';
import { TechnicalHubService } from './technical-hub.service';
import { Document, DownloadLog } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Document, DownloadLog])],
  controllers: [TechnicalHubController],
  providers: [TechnicalHubService],
  exports: [TechnicalHubService],
})
export class TechnicalHubModule {}
