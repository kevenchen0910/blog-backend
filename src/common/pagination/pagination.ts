import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

import { PageInfo } from './page-info.model';

export function Paginated<Item>(ItemClass: Type<Item>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [ItemClass], { nullable: true })
      nodes!: Item[];

    @Field(() => PageInfo)
      pageInfo!: PageInfo;

    @Field(() => Number)
      totalCount!: number;
  }

  return PaginatedType;
}
