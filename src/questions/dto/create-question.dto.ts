import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  Validate,
  IsOptional,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';
import { QuestionType } from '../entities/question.entity';
import { IsNull } from 'typeorm';

export class CreateQuestionDto {
  @IsUUID()
  @IsNotEmpty()
  topic_id: string;

  @IsUUID()
  @IsNotEmpty()
  level_id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  question_type: QuestionType;

  @IsString()
  @IsNotEmpty()
  answer_text: string;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  owner_id?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  @IsOptional()
  answers?: CreateAnswerDto[];
}

