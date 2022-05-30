import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import firebase from 'firebase-admin';
import { FirebaseStrategy } from './firebase.strategy';
import * as path from 'path';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-jwt' })],
  providers: [FirebaseStrategy],
  exports: [PassportModule]
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  async onModuleInit() {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require(path.resolve(this.configService.get('FIREBASE_CONFIG')))
      )
    });
  }
}
