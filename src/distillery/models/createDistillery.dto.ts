import { GeoLocation } from '@/models/GeoLocation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsIn,
  IsUrl
} from 'class-validator';
import { DistilleryRegion } from '../enums/distilleryRegion';

export class CreateDistilleryDto {
  @IsString()
  public name: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => GeoLocation)
  public location: GeoLocation;

  @IsString()
  @IsIn(Object.values(DistilleryRegion))
  public region: DistilleryRegion;

  @IsUrl()
  public website: string;

  @IsUrl()
  public imageSrc: string;

  @IsString()
  public description?: string;
}
