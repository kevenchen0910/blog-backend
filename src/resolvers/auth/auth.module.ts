import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { SecurityConfig } from '../../config';
import { GqlAuthGuard } from '../../guards';
import {
  AuthService, PasswordService, PrismaService, UserService,
} from '../../services';

import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const { secret, expiresIn } = configService.get('security') as SecurityConfig;

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService,
    PrismaService,
  ],
})
export class AuthModule {}
