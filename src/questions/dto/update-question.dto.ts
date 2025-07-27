import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  // Inherits all properties from CreateQuestionDto and makes them optional
  // You can add additional properties specific to updating a question if needed
  // For example, you might want to allow updating the question text or the level
  // but not the topic or question type.
}
