import { Module, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import firebase from 'firebase-admin';
import { FirebaseStrategy } from './firebase.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-jwt' })],
  providers: [FirebaseStrategy],
  exports: [PassportModule]
})
export class AuthModule implements OnModuleInit {
  async onModuleInit() {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        require('../../whiskyapp-351319-firebase-adminsdk-1zkdk-48b8b1e67d.json')
      )
    });
  }
}
