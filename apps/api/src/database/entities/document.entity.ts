import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { DocumentType, DocumentAccessLevel } from '@technobit/shared';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'enum', enum: DocumentType })
  type!: DocumentType;

  @Column()
  file_url!: string;

  @Column({ type: 'enum', enum: DocumentAccessLevel, default: DocumentAccessLevel.PUBLIC })
  access_level!: DocumentAccessLevel;

  @Column({ default: 'en' })
  language!: string;

  @Column({ default: '1.0' })
  version!: string;
}
