import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf
} from 'class-validator';

export class DistillerySearchQueryDto {
  @ValidateIf((o) => o.name !== undefined)
  @IsString()
  @ApiProperty({ required: false })
  public name?: string;

  @ValidateIf((o) => o.latitude !== undefined)
  @IsLatitude()
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({ required: false })
  public latitude?: number;

  @ValidateIf((o) => o.longitude !== undefined)
  @IsLongitude()
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({ required: false })
  public longitude?: number;

  @ValidateIf((o) => o.distance !== undefined)
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @ApiProperty({ required: false })
  public distance?: number;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @Max(100)
  public limit?: number;

  @ApiProperty({ default: 0, required: false })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  public skip?: number;
}
