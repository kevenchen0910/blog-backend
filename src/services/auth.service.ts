import { Injectable } from '@nestjs/common';

import { SignupInput } from '../resolvers';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(data: SignupInput) {
    const user = await this.userService.createUser(data);

    return user;
  }
}
