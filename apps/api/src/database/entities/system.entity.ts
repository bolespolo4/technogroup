import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('systems')
export class SystemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', default: '' })
  description!: string;

  @Column({ type: 'text', default: '' })
  climate_notes!: string;

  @Column({ default: '' })
  diagram_url!: string;

  @Column({ default: '' })
  meta_title!: string;

  @Column({ type: 'text', default: '' })
  meta_description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
