import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemsController } from './systems.controller';
import { SystemsService } from './systems.service';
import { System, Product } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([System, Product])],
  controllers: [SystemsController],
  providers: [SystemsService],
  exports: [SystemsService],
})
export class SystemsModule {}
