import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '@technobit/shared';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ default: '' })
  company!: string;

  @Column({ default: '' })
  country!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.REGISTERED })
  role!: UserRole;

  @Column({ default: false })
  is_verified!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  last_login!: Date;
}
