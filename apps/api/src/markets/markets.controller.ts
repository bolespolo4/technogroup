import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MarketsService } from './markets.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, Market } from '../database/entities';

@ApiTags('Markets')
@Controller('markets')
export class MarketsController {
  constructor(private marketsService: MarketsService) {}

  @Get()
  @ApiOperation({ summary: 'List all markets' })
  findAll() {
    return this.marketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get market by ID' })
  findOne(@Param('id') id: string) {
    return this.marketsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create market (Admin)' })
  create(@Body() dto: Partial<Market>) {
    return this.marketsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update market (Admin)' })
  update(@Param('id') id: string, @Body() dto: Partial<Market>) {
    return this.marketsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete market (Admin)' })
  remove(@Param('id') id: string) {
    return this.marketsService.remove(id);
  }
}
