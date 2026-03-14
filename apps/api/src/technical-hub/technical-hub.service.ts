import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DownloadLog } from '../database/entities';

@Injectable()
export class TechnicalHubService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(DownloadLog)
    private downloadLogRepository: Repository<DownloadLog>,
  ) {}

  async search(query: string) {
    const sanitized = query.replace(/[%_\\]/g, '\\$&');
    return this.documentRepository.createQueryBuilder('doc')
      .where('doc.isActive = :isActive', { isActive: true })
      .andWhere('(doc.title ILIKE :query OR doc.searchVector ILIKE :query)', { query: `%${sanitized}%` })
      .getMany();
  }

  async findAll(productSlug?: string, systemSlug?: string) {
    const where: any = { isActive: true };
    if (productSlug) where.productSlug = productSlug;
    if (systemSlug) where.systemSlug = systemSlug;
    return this.documentRepository.find({ where });
  }

  async findOne(id: string) {
    const doc = await this.documentRepository.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async download(id: string, userId?: string) {
    const doc = await this.findOne(id);
    await this.documentRepository.increment({ id }, 'downloadCount', 1);
    return { url: doc.fileUrl, title: doc.title };
  }

  async create(dto: Partial<Document>) {
    const doc = this.documentRepository.create(dto);
    return this.documentRepository.save(doc);
  }

  async update(id: string, dto: Partial<Document>) {
    await this.documentRepository.update(id, dto);
    return this.documentRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.documentRepository.update(id, { isActive: false });
    return { success: true };
  }
}
