import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { Question } from '../questions/entities/question.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { LevelsModule } from 'src/levels/levels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProgress, Question]),
    QuestionsModule,
    LevelsModule],
  providers: [UserProgressService],
  controllers: [UserProgressController],
  exports: [UserProgressService, TypeOrmModule.forFeature([UserProgress])],
})
export class UserProgressModule {}
