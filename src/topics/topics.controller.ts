import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './entities/topic.entity';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicService: TopicsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  async findAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicService.findOne(id);
  }

  @Get('topic-name/:topicName')
  async findByTopicName(@Param('topicName') topicName: string): Promise<Topic> {
    return this.topicService.findByTopicName(topicName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<Topic> {
    return this.topicService.update(id, updateTopicDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Respond with 204 No Content on successful deletion
  async remove(@Param('id') id: string): Promise<void> {
    return this.topicService.remove(id);
  }
}
