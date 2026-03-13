import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { MediaFiltersDto } from './dto/media-filters.dto';
import { Public } from '../common/decorators/roles.decorator';

@ApiTags('media')
@Controller('media')
@Public()
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'List media posts' })
  findAll(@Query() filters: MediaFiltersDto) {
    return this.mediaService.findAll(filters);
  }

  @Get('featured-projects')
  @ApiOperation({ summary: 'Get featured international projects' })
  getFeaturedProjects() {
    return this.mediaService.getFeaturedProjects();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get media post by slug' })
  findOne(@Param('slug') slug: string) {
    return this.mediaService.findBySlug(slug);
  }
}
