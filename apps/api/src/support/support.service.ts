import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportRequestEntity } from '../database/entities/support-request.entity';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportRequestEntity)
    private supportRepository: Repository<SupportRequestEntity>,
  ) {}

  async create(dto: CreateSupportRequestDto): Promise<SupportRequestEntity> {
    const request = this.supportRepository.create(dto);
    return this.supportRepository.save(request);
  }
}
