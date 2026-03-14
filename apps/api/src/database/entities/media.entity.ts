import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MediaType {
  NEWS = 'news',
  EVENT = 'event',
  PROJECT = 'project',
  AWARD = 'award',
  VIDEO = 'video',
}

@Entity('media')
export class MediaItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'date', nullable: true })
  eventDate: Date;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
