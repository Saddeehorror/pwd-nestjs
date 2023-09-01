import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly usersService: UsersService
  ) {
    this.googleClient = new OAuth2Client('461194805350-qi44ir3qbpkr5babnisb2amclrkgm1b0.apps.googleusercontent.com'); // Reemplaza con tu propio ID de cliente

  }

  async handleGoogleLogin(token: string): Promise<any> {
    const googlePayload = await this.verifyGoogleToken(token);
    console.log('googlePayload',googlePayload);

    let user = await this.usersService.findByGoogleId(googlePayload.sub);

    if (!user) {
      // Si el usuario no existe, crea uno nuevo
      user = await this.usersService.create({
        sub: googlePayload.sub,
        email: googlePayload.email,
        googlename:googlePayload.name,
        username:'',
        picture:googlePayload.picture,
        // Otros datos del usuario que desees almacenar
      });
    }

    return user;
  }

    // Función para verificar el token de Google
    async verifyGoogleToken(token: string): Promise<any> {
      try {
        const ticket = await this.googleClient.verifyIdToken({
          idToken: token,
          audience: '461194805350-qi44ir3qbpkr5babnisb2amclrkgm1b0.apps.googleusercontent.com', // Reemplaza con tu propio ID de cliente
        });
  
        const payload = ticket.getPayload();
        return payload;
      } catch (error) {
        throw new Error('Token inválido');
      }
    }

}