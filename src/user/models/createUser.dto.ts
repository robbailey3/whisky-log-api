import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'email@example.com' })
  public email: string;

  @IsString()
  public password: string;

  @IsArray()
  public permissions: string[];

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
