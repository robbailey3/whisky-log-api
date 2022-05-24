import { GeoLocation } from '@/models/GeoLocation.dto';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ObjectId } from 'bson';

export class DistilleryDto {
  @Transform(({ value }) => value.toHexString(), { toPlainOnly: true })
  public _id: string | ObjectId;

  @IsString()
  public name: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => GeoLocation)
  public location: GeoLocation;
}
