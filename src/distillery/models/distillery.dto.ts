import { GeoLocation } from '@/models/GeoLocation.dto';
import { BaseModel } from '@/shared/models/BaseModel';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested
} from 'class-validator';
import { DistilleryRegion } from '../enums/distilleryRegion';

export class DistilleryDto extends BaseModel {
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

  @IsEmpty()
  @ApiProperty({ readOnly: true })
  public formattedAddress: string;

  @IsString()
  public description?: string;
}
