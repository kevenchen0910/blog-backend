import 'reflect-metadata';

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
    id!: string;

  @Field({
    description: 'Identifies the date and time when the post was created',
  })
    createAt!: Date;

  @Field({
    description: 'Identifies the date and time when the post was last updated',
  })
    updateAt!: Date;
}
