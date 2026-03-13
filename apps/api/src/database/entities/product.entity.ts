import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column({ default: '' })
  code!: string;

  @Column({ default: '' })
  family!: string;

  @Column({ type: 'text', default: '' })
  description!: string;

  @Column({ default: '' })
  intended_use!: string;

  @Column({ type: 'text', default: '' })
  usp!: string;

  @Column({ default: '' })
  application_method!: string;

  @Column({ default: '' })
  polymer_modification!: string;

  @Column({ default: '' })
  reinforcement!: string;

  @Column({ default: '' })
  surface_finish!: string;

  @Column({ type: 'simple-array', default: '' })
  certifications!: string[];

  @Column({ type: 'simple-array', default: '' })
  images!: string[];

  @Column({ type: 'simple-array', default: '' })
  compatible_systems!: string[];

  @Column({ default: '' })
  meta_title!: string;

  @Column({ type: 'text', default: '' })
  meta_description!: string;

  @Column({ default: true })
  is_published!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
