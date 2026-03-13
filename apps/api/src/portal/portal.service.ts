import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class PortalService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getDashboard(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return {
      user,
      savedProducts: [],
      recentDownloads: [],
    };
  }

  getDownloads(_userId: string) {
    return { downloads: [] };
  }
}
