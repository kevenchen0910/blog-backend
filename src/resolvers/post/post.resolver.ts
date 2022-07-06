import 'reflect-metadata';

import { Args, Query, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from '../../common/pagination';
import { Post, PostConnection, PostOrder } from '../../models';
import { PostService } from '../../services';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Query(() => PostConnection)
  posts(
  @Args({ nullable: true }) pagination?: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true }) query?: string,
    @Args({ name: 'orderBy', type: () => PostOrder, nullable: true }) orderBy?: PostOrder,
  ) {
    return this.postService.findPosts(pagination, query, orderBy);
  }
}
