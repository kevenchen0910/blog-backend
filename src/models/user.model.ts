import 'reflect-metadata';

import {
  Field, HideField, ObjectType,
} from '@nestjs/graphql';

import { BaseModel } from './base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
    email!: string;

  @Field({ nullable: true })
    username?: string;

  @Field({ nullable: true })
    avatar?: string;

  @HideField()
    password!: string;
}
