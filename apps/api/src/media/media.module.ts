import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaPostEntity } from '../database/entities/media-post.entity';
import { ProjectEntity } from '../database/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaPostEntity, ProjectEntity])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
