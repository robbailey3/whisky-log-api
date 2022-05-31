import { CreateUserDto } from '@/user/models/createUser.dto';
import {
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() body: CreateUserDto) {
    try {
      await this.authService.register(body);
    } catch (error) {
      // TODO: Handle error
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
