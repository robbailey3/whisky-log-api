import { GeoLocation } from '@/models/GeoLocation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';

export class DistilleryDto {
  @IsEmpty()
  @ApiProperty({ readOnly: true })
  public _id: string | ObjectId;

  @IsString()
  public name: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => GeoLocation)
  public location: GeoLocation;
}
