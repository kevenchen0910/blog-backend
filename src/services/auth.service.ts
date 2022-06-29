import 'reflect-metadata';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs, { ManipulateType } from 'dayjs';

import { GqlHttpContext } from '../common/context';
import { getDomainFromHost } from '../common/helpers';
import { CookiesConfig, SecurityConfig } from '../config';
import { Auth, Token } from '../models';
import type { JwtDto, SignupInput } from '../resolvers';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  static refreshTokenKey = 'rt';

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

  setRefreshCookie(context: GqlHttpContext, refreshToken: string) {
    const host = context.req.headers.host as string;
    const domain = getDomainFromHost(host);
    const {
      path, httpOnly, secure, sameSite,
    } = this.configService.get('cookies') as CookiesConfig;
    const { refreshIn } = this.configService.get('security') as SecurityConfig;
    const expires: Date | undefined = refreshIn
      ? dayjs()
        .add(
          parseInt(refreshIn, 10),
          refreshIn[refreshIn.length - 1] as ManipulateType,
        )
        .toDate()
      : undefined;

    context.res.setHeader('access-control-allow-credentials', 'true');

    // write cookie
    context.res.cookie(AuthService.refreshTokenKey, refreshToken, {
      expires,
      path,
      domain,
      httpOnly,
      secure,
      sameSite,
    });
  }
}
