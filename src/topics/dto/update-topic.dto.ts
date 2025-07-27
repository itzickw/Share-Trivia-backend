import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
