import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TechnicalHubService } from './technical-hub.service';
import { Public } from '../common/decorators/roles.decorator';

@ApiTags('technical-hub')
@Controller('technical-hub')
@Public()
export class TechnicalHubController {
  constructor(private technicalHubService: TechnicalHubService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search products, systems, and documents' })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'type', required: false, enum: ['product', 'system', 'document'] })
  search(
    @Query('q') q?: string,
    @Query('type') type?: 'product' | 'system' | 'document',
  ) {
    return this.technicalHubService.search({ q, type });
  }
}
