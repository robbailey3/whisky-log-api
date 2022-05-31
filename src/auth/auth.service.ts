import { CreateUserDto } from '@/user/models/createUser.dto';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService
  ) {}
  public async register(newUser: CreateUserDto): Promise<any> {
    let firebaseUser = await this.firebaseService.createFirebaseUser(newUser);

    await this.firebaseService.setUserPermission(
      firebaseUser.uid,
      newUser.permissions
    );

    firebaseUser = await this.firebaseService.getUserByEmail(newUser.email);

    const user = await this.userService.create(newUser);

    return user;
  }
}
