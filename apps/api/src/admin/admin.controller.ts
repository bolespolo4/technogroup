import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@technobit/shared';

@ApiTags('admin')
@Controller('admin')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class AdminController {
  @Get('support-requests')
  @ApiOperation({ summary: 'List all support requests (admin only)' })
  getSupportRequests() {
    return { message: 'Admin support requests endpoint' };
  }

  @Get('leads')
  @ApiOperation({ summary: 'List all leads (admin only)' })
  getLeads() {
    return { message: 'Admin leads endpoint' };
  }
}
