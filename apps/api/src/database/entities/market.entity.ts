import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { MarketStatus } from '@technobit/shared';

@Entity('markets')
export class MarketEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  country_code!: string;

  @Column()
  country_name!: string;

  @Column({ type: 'enum', enum: MarketStatus, default: MarketStatus.DEVELOPMENT })
  status!: MarketStatus;

  @Column({ default: 0 })
  projects_count!: number;

  @Column({ type: 'bigint', default: 0 })
  sqm_exported!: number;
}
