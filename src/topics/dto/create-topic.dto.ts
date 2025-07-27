// src/topics/dto/create-topic.dto.ts
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  owner_id: string;
}
