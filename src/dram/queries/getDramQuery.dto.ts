import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class GetDramQueryDto {
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
