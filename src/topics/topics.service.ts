import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ValidationService } from 'src/common/validation/validation.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    private readonly validationService: ValidationService, 
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const newTopic = this.topicRepository.create(createTopicDto);
    return this.topicRepository.save(newTopic);
  }

  async findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  async findOne(id: string): Promise<Topic> {
    const topic = await this.validationService.validateTopic(id);
    return topic;
  }

  async findByTopicName(topicName: string): Promise<Topic> {
    const topics = await this.validationService.validateTopicName(topicName);
    return topics;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.topicRepository.preload({
      id: id,
      ...updateTopicDto,
    });
    if (!topic) {
      throw new NotFoundException(`Topic with id ${id} not found`);
    }
    return this.topicRepository.save(topic);
  }

  async remove(id: string): Promise<void> {
    const result = await this.topicRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Topic with id ${id} not found`);
    }
  }
}
