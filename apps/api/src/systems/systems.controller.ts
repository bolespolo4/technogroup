import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SystemsService } from './systems.service';
import { Public } from '../common/decorators/roles.decorator';

@ApiTags('systems')
@Controller('systems')
@Public()
export class SystemsController {
  constructor(private systemsService: SystemsService) {}

  @Get()
  @ApiOperation({ summary: 'List all systems' })
  findAll() {
    return this.systemsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get system by slug' })
  findOne(@Param('slug') slug: string) {
    return this.systemsService.findBySlug(slug);
  }
}
