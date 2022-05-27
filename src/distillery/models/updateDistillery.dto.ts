import { PartialType } from '@nestjs/swagger';
import { CreateDistilleryDto } from './createDistillery.dto';

export class UpdateDistilleryDto extends PartialType(CreateDistilleryDto) {}
