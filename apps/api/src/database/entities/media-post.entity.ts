import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';
import { MediaType } from '@technobit/shared';

@Entity('media_posts')
export class MediaPostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'enum', enum: MediaType })
  type!: MediaType;

  @Column()
  title!: string;

  @Column({ type: 'jsonb', default: {} })
  body_json!: Record<string, unknown>;

  @Column({ type: 'text', default: '' })
  excerpt!: string;

  @Column({ default: '' })
  cover_image!: string;

  @CreateDateColumn()
  published_at!: Date;

  @Column({ default: '' })
  meta_title!: string;

  @Column({ type: 'text', default: '' })
  meta_description!: string;

  @Column({ type: 'simple-array', default: '' })
  tags!: string[];
}
