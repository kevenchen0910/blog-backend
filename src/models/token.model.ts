import 'reflect-metadata';

import { Field, HideField, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field({ description: 'JWT access token' })
    token!: string;

  @HideField()
    refreshToken!: string;
}
