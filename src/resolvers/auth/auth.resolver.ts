import 'reflect-metadata';

import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../../models';
import { AuthService } from '../../services';

import { SignupInput } from './dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args('data') data: SignupInput) {
    const email = data.email.toLowerCase();
    const user = await this.authService.signup({
      ...data,
      email,
    });

    return user;
  }
}
