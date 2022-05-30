import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './firebase.strategy';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-jwt' })],
  providers: [FirebaseStrategy, FirebaseService],
  exports: [PassportModule, FirebaseService]
})
export class AuthModule {}
