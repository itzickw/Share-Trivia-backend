import { IsInt, IsNumber } from 'class-validator';
import { Question } from 'src/questions/entities/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unique: true })
  @IsInt()
  level_number: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  color: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Question, (question) => question.level)
  questions: Question[];
}
