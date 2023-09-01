// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config'; // Necesitarás configurar tus variables de entorno

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService) {
        super({
          clientID: configService.get('GOOGLE_CLIENT_ID'),
          clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
          callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
          scope: ['profile', 'email'],
        });
      }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { id, emails, displayName } = profile;
    const user = {
      googleId: id,
      email: emails[0]?.value,
      displayName: displayName,
    };
    done(null, user);
  }
}