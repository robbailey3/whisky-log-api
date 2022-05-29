import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString, Max, Min } from 'class-validator';
import { SortDirection } from 'mongodb';

export class GetWhiskyQueryDto {
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

  @ApiProperty({ default: 'dateAdded', required: false })
  @IsString()
  public sort?: string;

  @ApiProperty({ default: 'desc', required: false, type: String })
  @IsIn(['asc', 'desc'])
  public sortDirection?: SortDirection;
}
