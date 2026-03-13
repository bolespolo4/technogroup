import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PortalService } from './portal.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserEntity } from '../database/entities/user.entity';

@ApiTags('portal')
@Controller('portal')
@ApiBearerAuth()
export class PortalController {
  constructor(private portalService: PortalService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get portal dashboard' })
  getDashboard(@CurrentUser() user: UserEntity) {
    return this.portalService.getDashboard(user.id);
  }

  @Get('downloads')
  @ApiOperation({ summary: 'Get download history' })
  getDownloads(@CurrentUser() user: UserEntity) {
    return this.portalService.getDownloads(user.id);
  }
}
