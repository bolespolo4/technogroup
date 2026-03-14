import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportRequest } from '../database/entities';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportRequest)
    private supportRepository: Repository<SupportRequest>,
  ) {}

  async create(dto: CreateSupportRequestDto) {
    const request = this.supportRepository.create(dto);
    return this.supportRepository.save(request);
  }

  async findAll() {
    return this.supportRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    return this.supportRepository.findOne({ where: { id } });
  }
}
