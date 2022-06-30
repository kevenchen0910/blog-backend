import 'reflect-metadata';

import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { MIN_PWD_LENGTH } from '../../../config';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
    email!: string;

  @Field()
  @IsNotEmpty()
  @MinLength(MIN_PWD_LENGTH)
    password!: string;
}
