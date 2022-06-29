import 'reflect-metadata';

import { Module } from '@nestjs/common';

import {
  AuthService, PasswordService, PrismaService, UserService,
} from '../../services';

import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver, AuthService, UserService, PasswordService, PrismaService],
})
export class AuthModule {}
