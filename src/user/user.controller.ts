import { FirebaseService } from '@/auth/firebase/firebase.service';
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './models/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Post()
  public async createUser(@Body() body: CreateUserDto) {
    try {
      const firebaseUser = await this.firebaseService.createFirebaseUser(body);

      await this.firebaseService.setUserPermission(
        firebaseUser.uid,
        body.permissions
      );

      const fireyUser = await this.firebaseService.getUserByEmail(body.email);

      console.log({ fireyUser });

      const u = await this.userService.create(body);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new ConflictException('Email already exists');
      }
    }
  }
}
