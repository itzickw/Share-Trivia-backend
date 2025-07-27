// src/questions/question-validator.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { Question, QuestionType } from './entities/question.entity';
import { CreateAnswerDto } from '../answers/dto/create-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionValidatorService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  validateQuestionTypeSpecifics(
    questionType: QuestionType,
    answerText: string,
    answers?: CreateAnswerDto[],
  ): void {
    if (!(questionType === QuestionType.MULTIPLE_CHOICE || questionType === QuestionType.OPEN))
      throw new BadRequestException(
        'Invalid question type. Must be either MULTIPLE_CHOICE or OPEN.',
      );
      
    if (questionType === QuestionType.MULTIPLE_CHOICE) {
      if (!answerText) {
        throw new BadRequestException(
          'Multiple choice questions must have a correct answer text.',
        );
      }
      if (!answers || answers.length === 0) {
        throw new BadRequestException(
          'Multiple choice questions must have at least one incorrect answer option.',
        );
      }
      if (answers.some((a) => a.text === answerText)) {
        throw new BadRequestException(
          'Correct answer text cannot be one of the incorrect answer options.',
        );
      }
    } else if (questionType === QuestionType.OPEN) {
      if (!answerText) {
        throw new BadRequestException(
          'Open questions must have a correct answer text.',
        );
      }
      if (answers && answers.length > 0) {
        throw new BadRequestException(
          'Open questions cannot have answer options.',
        );
      }
    }
  }
}
