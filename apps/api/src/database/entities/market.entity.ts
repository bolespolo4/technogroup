import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MarketStatus {
  ACTIVE = 'active',
  PARTNER = 'partner',
  DISTRIBUTOR = 'distributor',
  TARGET = 'target',
}

@Entity('markets')
export class Market {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column({ length: 2 })
  countryCode: string;

  @Column({ nullable: true })
  region: string;

  @Column({ type: 'enum', enum: MarketStatus, default: MarketStatus.TARGET })
  status: MarketStatus;

  @Column({ nullable: true })
  partnerName: string;

  @Column({ nullable: true })
  partnerContact: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
