import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
    startCursor?: string;

  @Field({ nullable: true })
    endCursor?: string;

  @Field()
    hasNextPage!: boolean;

  @Field()
    hasPreviousPage!: boolean;
}
