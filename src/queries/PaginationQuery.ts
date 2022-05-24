import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty({
    type: Number,
    description: 'The number of records to skip',
    example: 1
  })
  public skip: number;

  @ApiProperty({
    type: Number,
    description: 'The number of items per page',
    example: 10
  })
  public limit: number;
}
