import {
  ArrayMaxSize,
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
  public coordinates: number[] | number[][];
}
