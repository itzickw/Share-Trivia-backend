import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question, QuestionType } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Topic } from 'src/topics/entities/topic.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ValidationService } from 'src/common/validation/validation.service';
import { QuestionValidatorService } from './question-validator.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private validationService: ValidationService,
    private questionValidatorService: QuestionValidatorService,
  ) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const {
      topic_id,
      level_id,
      text,
      question_type,
      answer_text,
      owner_id,
      answers,
    } = createQuestionDto;

    this.validationService.validateTopic(topic_id);
    this.validationService.validateLevel(level_id);

    this.questionValidatorService.validateQuestionTypeSpecifics(
      question_type,
      answer_text,
      answers,
    );

    const question = this.questionRepository.create({
      topic: { id: topic_id } as Topic,
      level: { id: level_id } as Level,
      text: text,
      question_type: question_type,
      answer_text: answer_text,
      owner_id: owner_id,
      answers: answers
        ? answers.map((answerDto) => this.answerRepository.create({ text: answerDto.text }))
        : [], // Map answers to the expected format
    });

    return this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find({
      relations: ['topic', 'level', 'answers'],
    });
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['topic', 'level', 'answers'], // טוען את כל היחסים הרצויים
    });

    if (!question) {
      throw new NotFoundException(`Question with ID "${id}" not found.`);
    }
    if (question.answers && question.answers.length > 0) {
      question.answers.forEach(answer => {
        if (!answer.question) {
          answer.question = question; // Ensure the question reference is set
        }
      });
    }
    return question;
  }

  async findByTopicName(topicName: string): Promise<Question[]> {
    const topic = await this.validationService.validateTopicName(topicName);
    const questions = await this.questionRepository.find({
      where: { topic: { id: topic.id } },
      relations: ['topic', 'level', 'answers'],
    });
    if (questions.length === 0) {
      throw new NotFoundException(`No questions found for topic with name ${topicName}`);
    }
    return questions;
  }
  
  async findByTopicId(topicId: string): Promise<Question[]> {
    this.validationService.validateTopic(topicId);
    const questions = await this.questionRepository.find({
      where: { topic: { id: topicId } },
      relations: ['topic', 'level', 'answers'],
    });

    if (questions.length === 0) {
      throw new NotFoundException(`No questions found for topic with id ${topicId}`);
    }
    return questions;
  }

  async findByLevelId(levelId: string): Promise<Question[]> {
    this.validationService.validateLevel(levelId);
    const questions = await this.questionRepository.find({
      where: { level: { id: levelId } },
      relations: ['topic', 'level', 'answers'],
    });

    if (questions.length === 0) {
      throw new NotFoundException(`No questions found for level with id ${levelId}`);
    }
    return questions;
  }

  async findQuizQuestions(
    topicName: string,
    levelNumber: number,
  ): Promise<Question[]> {
    const topic = await this.validationService.validateTopicName(topicName);
    const level = await this.validationService.validateLevelNumber(levelNumber);

    const questions = await this.findByTopicId(topic.id)
    .then(questions => questions.filter(q => q.level.level_number === levelNumber));
    return questions;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const oldQuestion = await this.findOne(id);    

    const createQuestionDto = {
      topic_id: updateQuestionDto.topic_id || oldQuestion.topic.id,
      level_id: updateQuestionDto.level_id || oldQuestion.level.id,
      text: updateQuestionDto.text || oldQuestion.text,
      question_type: updateQuestionDto.question_type || oldQuestion.question_type,
      answer_text: updateQuestionDto.answer_text || oldQuestion.answer_text,
      owner_id: updateQuestionDto.owner_id || oldQuestion.owner_id,
      answers: updateQuestionDto.answers ? updateQuestionDto.answers.map(answer => ({ text: answer.text })) :
        updateQuestionDto.question_type === QuestionType.OPEN ? [] :
        oldQuestion.answers?.map(answer => ({ text: answer.text })) || [],
    };

    await this.validationService.validateTopic(createQuestionDto.topic_id);
    await this.validationService.validateLevel(createQuestionDto.level_id);
    this.questionValidatorService.validateQuestionTypeSpecifics(
      createQuestionDto.question_type,
      createQuestionDto.answer_text,
      createQuestionDto.answers,
    );

    this.remove(oldQuestion.id);
    return this.create(createQuestionDto) as Promise<Question>;
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id)
    await this.questionRepository.remove(question);
  }
}