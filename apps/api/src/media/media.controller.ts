import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { MediaType, MediaItem } from '../database/entities';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../database/entities';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'List media items' })
  findAll(@Query('type') type?: MediaType) {
    return this.mediaService.findAll(type);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured media items' })
  findFeatured() {
    return this.mediaService.findFeatured();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get media item by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.mediaService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create media item (Admin)' })
  create(@Body() dto: Partial<MediaItem>) {
    return this.mediaService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update media item (Admin)' })
  update(@Param('id') id: string, @Body() dto: Partial<MediaItem>) {
    return this.mediaService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete media item (Admin)' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
