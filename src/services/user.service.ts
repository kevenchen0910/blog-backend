import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { User } from '../models';
import { SignupInput } from '../resolvers';

import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createUser(payload: SignupInput) {
    const { email } = payload;

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
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
}
