import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  // Inherits all properties from CreateLevelDto and makes them optional
  // You can add additional properties specific to updating a level if needed
}
