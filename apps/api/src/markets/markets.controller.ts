import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MarketsService } from './markets.service';
import { Public } from '../common/decorators/roles.decorator';

@ApiTags('markets')
@Controller('markets')
@Public()
export class MarketsController {
  constructor(private marketsService: MarketsService) {}

  @Get()
  @ApiOperation({ summary: 'List all markets' })
  findAll() {
    return this.marketsService.findAll();
  }
}
