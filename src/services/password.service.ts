import 'reflect-metadata';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

import { SecurityConfig } from '../config';

@Injectable()
export class PasswordService {
  get bcryptSaltOrRounds(): string | number {
    const { bcryptSaltOrRounds } = this.configService.get('security') as SecurityConfig;
    const rounds = Number(bcryptSaltOrRounds);

    return Number.isInteger(rounds) ? rounds : bcryptSaltOrRounds;
  }

  constructor(private readonly configService: ConfigService) {}

  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltOrRounds);
  }
}
