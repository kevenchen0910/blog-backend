import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

import { BaseModel } from './base.model';
import { User } from './user.model';

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

registerEnumType(PostStatus, {
  name: 'PostStatus',
  description: 'Edit status of post',
});

@ObjectType()
export class Post extends BaseModel {
  @Field()
  @IsNotEmpty()
  @MaxLength(255)
    title!: string;

  @Field({
    description: 'Identifies the date and time when the post was created',
  })
    createAt!: Date;

  @Field({
    description: 'Identifies the date and time when the post was last updated',
  })
    updateAt!: Date;

  @Field({ nullable: true })
    content?: string;

  @Field()
    status!: PostStatus;

  @Field(() => User)
    author!: User;
}
