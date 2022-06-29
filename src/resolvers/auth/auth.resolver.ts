import 'reflect-metadata';

import {
  Args, Context, Mutation, Resolver,
} from '@nestjs/graphql';

import { GqlHttpContext } from '../../common/context';
import { Auth } from '../../models';
import { AuthService } from '../../services';

import { SignupInput } from './dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(
  @Context() context: GqlHttpContext,
    @Args('data') data: SignupInput,
  ) {
    const email = data.email.toLowerCase();
    const { refreshToken, ...restProps } = await this.authService.signup({
      ...data,
      email,
    });

    this.authService.setRefreshCookie(context, refreshToken);

    return {
      ...restProps,
      refreshToken,
    };
  }
}
