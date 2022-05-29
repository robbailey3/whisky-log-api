import { IsString } from 'class-validator';

export class CreateWhiskyDto {
  @IsString()
  public name: string;
}
