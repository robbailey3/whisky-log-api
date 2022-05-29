import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Transform, Type } from 'class-transformer';

export class BaseModel {
  @ApiProperty({ readOnly: true })
  @Type(() => String)
  public _id?: ObjectId;

  @ApiProperty({ readOnly: true })
  public dateAdded: Date;

  @ApiProperty({ readOnly: true })
  public dateUpdated: Date;

  @ApiProperty({ readOnly: true })
  @Type(() => String)
  public updatedBy?: ObjectId;
}
