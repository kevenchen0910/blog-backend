import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { SecurityConfig } from '../../config';
import { UserService } from '../../services';

import { JwtDto } from './dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    readonly configService: ConfigService,
  ) {
    const { secret } = configService.get('security') as SecurityConfig;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate({ uid }: JwtDto) {
    const user = await this.userService.validate(uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
