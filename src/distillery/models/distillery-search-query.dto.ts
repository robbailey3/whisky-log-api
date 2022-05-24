import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
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
  @ApiProperty({ required: false })
  public latitude?: number;

  @ValidateIf((o) => o.longitude !== undefined)
  @IsLongitude()
  @ApiProperty({ required: false })
  public longitude?: number;

  @ValidateIf((o) => o.distance !== undefined)
  @Min(0)
  @ApiProperty({ required: false })
  public distance?: number;

  @ValidateIf((o) => o.limit !== undefined)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({ default: 10, required: false })
  @Max(100)
  public limit?: number;

  @ValidateIf((o) => o.skip !== undefined)
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({ default: 0, required: false })
  @Min(0)
  public skip?: number;
}
