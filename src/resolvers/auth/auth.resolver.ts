import 'reflect-metadata';

import {
  Args, Context, Mutation, Resolver,
} from '@nestjs/graphql';

import { GqlHttpContext } from '../../common/context';
import { Auth } from '../../models';
import { AuthService } from '../../services';

import { LoginInput, SignupInput } from './dto';

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

  @Mutation(() => Auth)
  async login(
  @Context() context: GqlHttpContext,
    @Args('data') { email, password }: LoginInput,
  ) {
    const { refreshToken, ...restProps } = await this.authService.login(
      email.toLowerCase(),
      password,
    );

    this.authService.setRefreshCookie(context, refreshToken);

    return {
      ...restProps,
      refreshToken,
    };
  }
}
