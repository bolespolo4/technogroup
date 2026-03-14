import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalController } from './portal.controller';
import { PortalService } from './portal.service';
import { User, DownloadLog, Product } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, DownloadLog, Product])],
  controllers: [PortalController],
  providers: [PortalService],
  exports: [PortalService],
})
export class PortalModule {}
