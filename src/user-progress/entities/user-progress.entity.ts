import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, JoinColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
// import {User} from '../../users/entities/user.entity';
import {Question} from '../../questions/entities/question.entity';

@Entity('user_progress')
export class UserProgress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @ManyToMany(() => User, {onDelete: 'CASCADE'})
    // @JoinColumn({ name: 'user_id' })
    // @Column({ type: 'uuid' })
    // user: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @ManyToOne(() => Question,  {onDelete: 'CASCADE', nullable: false})
    @Column({ type: 'uuid' })
    @JoinColumn({ name: 'question_id' })
    question: string;
    
    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    answered_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}