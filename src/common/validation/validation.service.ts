import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionType } from 'src/questions/entities/question.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { Level } from 'src/levels/entities/level.entity';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) { }

  async validateTopic(topicId: string): Promise<Topic> {
    const topic = await this.topicRepository.findOne({
      where: { id: topicId },
    });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }
    return topic;
  }

  async validateTopicName(topicName: string): Promise<Topic> {
    const topic = await this.topicRepository.findOne({
      where: { name: topicName },
    });
    if (!topic) {
      throw new NotFoundException(`Topic with name ${topicName} not found`);
    }
    return topic;
  }

  async validateLevel(levelId: string): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { id: levelId },
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${levelId} not found`);
    }
    return level;
  }

  async validateLevelNumber(levelNumber: number): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { level_number: levelNumber },
    });
    if (!level) {
      throw new NotFoundException(`Level with number ${levelNumber} not found`);
    }
    return level;
  }

  async validateQuestionType(questionType: QuestionType): Promise<void> {
    if (!Object.values(QuestionType).includes(questionType)) {
      throw new NotFoundException(`Invalid question type: ${questionType}`);
    }
  }
}
