import 'reflect-metadata';

import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';

import { omit } from '../common/helpers';
import { PaginationArgs } from '../common/pagination';
import { PostConnection, PostOrder, PostStatus } from '../models';

import { PrismaService } from './prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findPosts(
    pagination?: PaginationArgs,
    query?: string,
    orderBy?: PostOrder,
    status?: PostStatus,
  ): Promise<PostConnection> {
    const where = {
      status,
      title: {
        contains: query || '',
      },
    };

    return findManyCursorConnection(
      (args) => this.prisma.post.findMany({
        include: { author: true },
        where: { ...where },
        orderBy: orderBy ? {
          [orderBy.field]: orderBy.direction,
        } : undefined,
        ...args,
      }),
      () => this.prisma.post.count({
        where: { ...where },
      }),
      omit(pagination, ['skip']),
    );
  }
}
