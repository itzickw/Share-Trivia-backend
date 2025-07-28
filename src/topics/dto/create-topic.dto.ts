// src/topics/dto/create-topic.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the topic',
    example: 'Science',
  })
  name: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the owner of the topic',
    example: 'UUID',
  })
  owner_id: string;
}
