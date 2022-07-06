import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
export class Post extends BaseModel {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
    title!: string;

  @Field({ nullable: true })
    content?: string;

  @Field()
    isPublished!: Boolean;

  @Field(() => User)
    author!: User;
}
