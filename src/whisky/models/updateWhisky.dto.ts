import { IsString } from 'class-validator';

export class UpdateWhiskyDto {
  @IsString()
  public name: string;
}
