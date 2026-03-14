import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SystemsService } from './systems.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, System } from '../database/entities';

@ApiTags('Systems')
@Controller('systems')
export class SystemsController {
  constructor(private systemsService: SystemsService) {}

  @Get()
  @ApiOperation({ summary: 'List all systems' })
  findAll() {
    return this.systemsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get system by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.systemsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create system (Admin)' })
  create(@Body() dto: Partial<System>) {
    return this.systemsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update system (Admin)' })
  update(@Param('id') id: string, @Body() dto: Partial<System>) {
    return this.systemsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete system (Admin)' })
  remove(@Param('id') id: string) {
    return this.systemsService.remove(id);
  }
}
