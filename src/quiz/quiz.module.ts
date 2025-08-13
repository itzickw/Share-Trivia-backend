import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuestionsModule } from 'src/questions/questions.module';
import { ValidationModule } from 'src/common/validation/validation.module';
import { UserProgressModule } from 'src/user-progress/user-progress.module';
import { LevelsModule } from 'src/levels/levels.module';

@Module({
  imports: [ValidationModule, QuestionsModule, UserProgressModule, LevelsModule],
  providers: [QuizService],
  controllers: [QuizController],
  exports: [QuizService]
})
export class QuizModule {}
