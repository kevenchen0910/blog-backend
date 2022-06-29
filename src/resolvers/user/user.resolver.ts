import 'reflect-metadata';

import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { UserEntity } from '../../decorators';
import { GqlAuthGuard } from '../../guards';
import { User } from '../../models';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }
}
