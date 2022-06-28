import 'reflect-metadata';

import { Context, Query, Resolver } from '@nestjs/graphql';

import { GqlHttpContext } from '../../common/context';
import { Hello } from '../../models';

@Resolver(() => Hello)
export class HelloResolver {
  @Query(() => Hello)
  async greeting(@Context() context: GqlHttpContext) {
    context.res.setHeader('Content-Type', 'application/json; charset=utf-8');

    return {
      message: 'hello world',
    };
  }
}
