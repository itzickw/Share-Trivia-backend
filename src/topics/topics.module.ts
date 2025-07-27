import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { Topic } from './entities/topic.entity'; // Adjust the import path as necessary
import { ValidationModule } from 'src/common/validation/validation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), ValidationModule], // Register the Topic entity with TypeORM
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService, TypeOrmModule.forFeature([Topic])], // Export TopicsService if it needs to be used in other modules
})
export class TopicsModule {}
