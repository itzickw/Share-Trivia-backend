// src/answers/entities/answer.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, question => question.answers, {
    onDelete: 'CASCADE',
    nullable: false,    
  })
  @JoinColumn({ name: 'question_id' }) // Join Column for Foreign Key
  question: Question;

  @Column({ type: 'text', nullable: false })
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
