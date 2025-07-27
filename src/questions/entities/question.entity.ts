// src/questions/entities/question.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import { Level } from '../../levels/entities/level.entity';
import { Answer } from '../../answers/entities/answer.entity';
import { IsOptional } from 'class-validator';

export enum QuestionType {
  OPEN = 'open',
  MULTIPLE_CHOICE = 'multiple_choice',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Topic, (topic) => topic.questions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'topic_id' }) // Join Column for Foreign Key
  topic: Topic;

  @ManyToOne(() => Level, (level) => level.questions, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn({ name: 'level_id' }) // Join Column for Foreign Key
  level: Level;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.OPEN,
    nullable: false,
  })
  question_type: QuestionType;

  @Column({ nullable: false })
  answer_text: string;

  @Column({ type: 'uuid', nullable: true })
  @IsOptional()
  owner_id: string;

  @OneToMany(() => Answer, answer => answer.question, {
    cascade: ['insert', 'update', 'remove'], // Automatically handle related answers
    eager: true,
  })
  @IsOptional()
  answers: Answer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
