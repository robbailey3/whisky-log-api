import { Controller, Get } from '@nestjs/common';
import { UserDto } from './models/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  public async getUsers(): Promise<UserDto[]> {
    return this.userService.find({}, {});
  }
}
