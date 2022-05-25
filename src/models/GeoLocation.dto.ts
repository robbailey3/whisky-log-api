import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNumber,
  IsString
} from 'class-validator';

export class GeoLocation {
  @IsString()
  @IsIn([
    'Point',
    'LineString',
    'Polygon',
    'MultiPoint',
    'MultiLineString',
    'MultiPolygon',
    'GeometryCollection'
  ])
  public type:
    | 'Point'
    | 'LineString'
    | 'Polygon'
    | 'MultiPoint'
    | 'MultiLineString'
    | 'MultiPolygon'
    | 'GeometryCollection';

  @IsArray()
  @ArrayMinSize(2)
  @IsNumber({}, { each: true })
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  public coordinates: number[] | number[][];
}
