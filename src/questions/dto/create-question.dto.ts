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
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the topic this question belongs to',
    example: 'UUID',
  })
  topic_id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the level this question belongs to',
    example: 'UUID',
  })
  level_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The text of the question',
    example: 'What is the capital of France?',
  })
  text: string;

  @IsEnum(QuestionType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of the question',
    enum: QuestionType,
    example: QuestionType.MULTIPLE_CHOICE + ' or ' + QuestionType.OPEN,
  })
  question_type: QuestionType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The correct answer to the question',
    example: 'Paris',
  })
  answer_text: string;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The ID of the owner of the question',
    example: 'UUID',})
  owner_id?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  @IsOptional()
  @ApiProperty({
    type: [CreateAnswerDto],
    description: 'The optional answers to the question',
    isArray: true,
    required: false,
  })
  answers?: CreateAnswerDto[];
}

