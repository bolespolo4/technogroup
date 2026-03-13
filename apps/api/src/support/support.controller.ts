import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { Public } from '../common/decorators/roles.decorator';

@ApiTags('support')
@Controller('support-requests')
@Public()
export class SupportController {
  constructor(private supportService: SupportService) {}

  @Post()
  @ApiOperation({ summary: 'Create support request' })
  create(@Body() dto: CreateSupportRequestDto) {
    return this.supportService.create(dto);
  }
}
