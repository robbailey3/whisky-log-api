import { BaseModel } from '@/shared/models/BaseModel';

export class UserDto extends BaseModel {
  public email: string;

  public lastLogin: Date | null;

  public permissions: string[];

  public firstName: string;

  public lastName: string;
}
