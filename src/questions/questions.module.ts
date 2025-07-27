import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { AnswersModule } from 'src/answers/answers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { TopicsModule } from 'src/topics/topics.module';
import { LevelsModule } from 'src/levels/levels.module';
import { ValidationModule } from 'src/common/validation/validation.module';
import { QuestionValidatorService } from './question-validator.service';
import { Answer } from 'src/answers/entities/answer.entity';
import { QuizService } from './quiz/quiz.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer]),
    AnswersModule,
    TopicsModule,
    LevelsModule,
    ValidationModule,
  ],
  providers: [QuestionsService, QuestionValidatorService, QuizService],
  controllers: [QuestionsController],
  exports: [QuestionsService, TypeOrmModule.forFeature([Question])],
})
export class QuestionsModule {}
