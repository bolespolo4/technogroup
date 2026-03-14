import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum DocumentType {
  TDS = 'tds',
  SDS = 'sds',
  CERTIFICATE = 'certificate',
  BROCHURE = 'brochure',
  GUIDE = 'guide',
  DRAWING = 'drawing',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: DocumentType })
  type: DocumentType;

  @Column()
  fileUrl: string;

  @Column({ nullable: true })
  fileSize: string;

  @Column({ nullable: true })
  productSlug: string;

  @Column({ nullable: true })
  systemSlug: string;

  @Column({ default: false })
  gated: boolean;

  @Column({ type: 'text', nullable: true })
  searchVector: string;

  @Column({ default: 0 })
  downloadCount: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
