import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, SupportRequest } from '../database/entities';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SupportRequest)
    private supportRepository: Repository<SupportRequest>,
  ) {}

  async getUsers() {
    return this.userRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getLeads() {
    return this.supportRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getDashboardStats() {
    const totalUsers = await this.userRepository.count();
    const totalLeads = await this.supportRepository.count();
    return { totalUsers, totalLeads };
  }
}
