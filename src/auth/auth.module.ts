import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './firebase.strategy';
import { FirebaseService } from './firebase/firebase.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
    UserModule
  ],
  providers: [FirebaseStrategy, FirebaseService, AuthService],
  exports: [PassportModule, FirebaseService],
  controllers: [AuthController]
})
export class AuthModule {}
