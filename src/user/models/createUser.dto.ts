import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @IsString()
  password: string;

  @IsArray()
  permissions: string[];
}
