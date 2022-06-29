import 'reflect-metadata';

import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Auth } from '../../models';
import { AuthService } from '../../services';

import { SignupInput } from './dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    const email = data.email.toLowerCase();
    const auth = await this.authService.signup({
      ...data,
      email,
    });

    return auth;
  }
}
