import 'reflect-metadata';

import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { User } from '../models';
import type { SignupInput } from '../resolvers';

import { PasswordService } from './password.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(payload: SignupInput) {
    const { email, password } = payload;
    const hashedPassword = await this.passwordService.hashPassword(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
      }) as User;

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException(`Email ${email} already used`);
      } else {
        throw new Error(error as string);
      }
    }
  }

  async validate(uid: string) {
    const user = await this.prisma.user
      .findUnique({
        where: { id: uid },
      }) as User;

    return user;
  }
}
