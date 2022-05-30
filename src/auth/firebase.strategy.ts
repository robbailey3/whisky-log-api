import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from 'firebase-admin';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(FirebaseStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  public async validate(token: string) {
    try {
      const decodedToken = await auth().verifyIdToken(token, true);

      return decodedToken;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
