import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DownloadLog } from '../database/entities';

@Injectable()
export class PortalService {
  constructor(
    @InjectRepository(DownloadLog)
    private downloadLogRepository: Repository<DownloadLog>,
  ) {}

  async getDashboard(userId: string) {
    const [downloads, totalDownloads] = await this.downloadLogRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['document'],
      order: { downloadedAt: 'DESC' },
      take: 10,
    });
    return { downloads, totalDownloads };
  }

  async getDownloadHistory(userId: string) {
    return this.downloadLogRepository.find({
      where: { user: { id: userId } },
      relations: ['document'],
      order: { downloadedAt: 'DESC' },
    });
  }
}
