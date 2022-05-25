import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Transform } from 'class-transformer';

export class BaseModel {
  @ApiProperty({ readOnly: true })
  public _id: string | ObjectId;

  @ApiProperty({ readOnly: true })
  public dateAdded: Date;

  @ApiProperty({ readOnly: true })
  public dateUpdated: Date;

  @ApiProperty({ readOnly: true })
  @Transform(({ value }) => value.toHexString(), { toPlainOnly: true })
  public updatedBy?: ObjectId;
}
