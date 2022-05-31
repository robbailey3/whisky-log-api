import { CreateUserDto } from '@/user/models/createUser.dto';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import firebase from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  public onModuleInit() {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require(path.resolve(this.configService.get('FIREBASE_CONFIG')))
      )
    });
  }

  public async createFirebaseUser(user: CreateUserDto) {
    return await firebase.auth().createUser({
      email: user.email,
      password: user.password,
      displayName: `${user.firstName} ${user.lastName}`
    });
  }

  public async setUserPermission(userId: string, permissions: string[]) {
    return await firebase.auth().setCustomUserClaims(userId, {
      permissions
    });
  }

  public async getUserPermissions(userId: string): Promise<string[]> {
    const user = await firebase.auth().getUser(userId);

    return user?.customClaims?.permissions || [];
  }

  public async getUserByEmail(email: string) {
    return await firebase.auth().getUserByEmail(email);
  }
}
