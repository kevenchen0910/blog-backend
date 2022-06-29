import { Module } from '@nestjs/common';

import {
  AuthService, PrismaService, UserService,
} from '../../services';

import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver, AuthService, UserService, PrismaService],
})
export class AuthModule {}
