import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  AuthService, PasswordService, PrismaService, UserService,
} from '../../services';

import { AuthResolver } from './auth.resolver';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtService,
    PasswordService,
    PrismaService,
  ],
})
export class AuthModule {}
