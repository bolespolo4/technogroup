import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TechnicalHubService } from './technical-hub.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, Document } from '../database/entities';

@ApiTags('Technical Hub')
@Controller('technical-hub')
export class TechnicalHubController {
  constructor(private technicalHubService: TechnicalHubService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search documents' })
  search(@Query('q') query: string) {
    return this.technicalHubService.search(query);
  }

  @Get()
  @ApiOperation({ summary: 'List documents' })
  findAll(@Query('product') productSlug?: string, @Query('system') systemSlug?: string) {
    return this.technicalHubService.findAll(productSlug, systemSlug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by ID' })
  findOne(@Param('id') id: string) {
    return this.technicalHubService.findOne(id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download document' })
  download(@Param('id') id: string) {
    return this.technicalHubService.download(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create document (Admin)' })
  create(@Body() dto: Partial<Document>) {
    return this.technicalHubService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update document (Admin)' })
  update(@Param('id') id: string, @Body() dto: Partial<Document>) {
    return this.technicalHubService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete document (Admin)' })
  remove(@Param('id') id: string) {
    return this.technicalHubService.remove(id);
  }
}
