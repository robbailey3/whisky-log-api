import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf
} from 'class-validator';

export class GetDistilleriesQuery {
  @ValidateIf((o) => o.name !== undefined)
  @IsString()
  @ApiProperty({ required: false })
  public name?: string;

  @ValidateIf((o) => o.latitude !== undefined)
  @IsLatitude()
  @Type(() => Number)
  @ApiProperty({ required: false })
  public latitude?: number;

  @ValidateIf((o) => o.longitude !== undefined)
  @IsLongitude()
  @Type(() => Number)
  @ApiProperty({ required: false })
  public longitude?: number;

  @ValidateIf((o) => o.distance !== undefined)
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ required: false })
  public distance?: number;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  @Type(() => Number)
  @Max(100)
  public limit?: number;

  @ApiProperty({ default: 0, required: false })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public skip?: number;
}