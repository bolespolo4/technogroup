import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PortalService } from './portal.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Portal')
@Controller('portal')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PortalController {
  constructor(private portalService: PortalService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get user dashboard data' })
  getDashboard(@Request() req: any) {
    return this.portalService.getDashboard(req.user.id);
  }

  @Get('downloads')
  @ApiOperation({ summary: 'Get download history' })
  getDownloadHistory(@Request() req: any) {
    return this.portalService.getDownloadHistory(req.user.id);
  }
}
