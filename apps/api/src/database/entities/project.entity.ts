import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column()
  country!: string;

  @Column({ default: '' })
  country_flag!: string;

  @Column({ default: '' })
  system_id!: string;

  @Column({ default: '' })
  system_name!: string;

  @Column({ default: new Date().getFullYear() })
  year!: number;

  @Column({ type: 'simple-array', default: '' })
  images!: string[];

  @Column({ type: 'text', default: '' })
  description!: string;

  @Column({ default: false })
  is_featured!: boolean;

  @Column({ default: false })
  is_international!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
