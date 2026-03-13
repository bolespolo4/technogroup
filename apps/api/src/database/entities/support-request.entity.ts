import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';
import { SupportType } from '@technobit/shared';

@Entity('support_requests')
export class SupportRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ default: '' })
  company!: string;

  @Column()
  country!: string;

  @Column()
  role!: string;

  @Column({ type: 'enum', enum: SupportType, default: SupportType.TECHNICAL })
  support_type!: SupportType;

  @Column({ type: 'simple-array', default: '' })
  systems!: string[];

  @Column({ type: 'simple-array', default: '' })
  product_families!: string[];

  @Column({ type: 'text' })
  description!: string;

  @Column({ nullable: true })
  attachment_url?: string;

  @Column({ default: 'pending' })
  status!: string;

  @CreateDateColumn()
  created_at!: Date;
}
