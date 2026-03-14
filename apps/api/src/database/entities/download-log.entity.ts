import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Document } from './document.entity';

@Entity('download_logs')
export class DownloadLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Document)
  document: Document;

  @Column({ nullable: true })
  ipAddress: string;

  @CreateDateColumn()
  downloadedAt: Date;
}
