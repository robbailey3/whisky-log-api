import { GeoLocation } from '@/models/GeoLocation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ObjectId } from 'bson';

export class DistilleryDto {
  @IsEmpty()
  @Transform(({ value }) => value.toHexString(), { toPlainOnly: true })
  public _id: string | ObjectId;

  @IsString()
  public name: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => GeoLocation)
  public location: GeoLocation;
}
