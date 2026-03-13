import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { SupportRequestEntity } from '../database/entities/support-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportRequestEntity])],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
