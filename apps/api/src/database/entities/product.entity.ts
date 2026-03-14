import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { System } from './system.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  family: string;

  @Column({ nullable: true })
  polymer: string;

  @Column({ nullable: true })
  reinforcement: string;

  @Column({ nullable: true })
  surface: string;

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  applications: string[];

  @Column({ type: 'jsonb', nullable: true })
  documents: Array<{ name: string; url: string; type: string }>;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => System, (system) => system.products)
  @JoinTable({ name: 'product_systems' })
  systems: System[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
