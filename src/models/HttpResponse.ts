import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse<T> {
  @ApiProperty({
    type: Number,
    description: 'The status code of the response',
    example: 200
  })
  public statusCode: number;

  @ApiProperty({
    type: Date,
    description: 'The date and time the response was generated',
    example: new Date()
  })
  public timestamp: Date;

  public result: T | T[];
}
