import 'reflect-metadata';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { SecurityConfig } from '../config';
import { Auth, Token } from '../models';
import type { JwtDto, SignupInput } from '../resolvers';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(payload: SignupInput): Promise<Auth> {
    const user = await this.userService.createUser(payload);

    return {
      user,
      ...this.generateToken({
        uid: user.id,
      }),
    };
  }

  generateToken(payload: JwtDto): Token {
    const { secret, expiresIn, refreshIn } = this.configService.get('security') as SecurityConfig;
    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret,
      expiresIn: refreshIn,
    });

    return {
      token,
      refreshToken,
    };
  }
}
