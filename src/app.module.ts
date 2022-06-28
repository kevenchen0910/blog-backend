import 'reflect-metadata';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, GraphQLSchemaHost, NumberScalarMode } from '@nestjs/graphql';

import { GqlHttpContext } from './common/context';
import { configFactory, GraphQLConfig } from './config';
import { HelloModule } from './resolvers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        const {
          autoSchemaFile,
          debug,
          playground,
          sortSchema,
          useGlobalPrefix,
        } = configService.get('graphql') as GraphQLConfig;

        return {
          autoSchemaFile,
          buildSchemaOptions: {
            numberScalarMode: 'integer' as NumberScalarMode,
          },
          context: ({ req, res }: GqlHttpContext) => ({ req, res }),
          debug,
          playground,
          sortSchema,
          useGlobalPrefix,
        };
      },
      inject: [ConfigService, GraphQLSchemaHost],
    }),
    HelloModule,
  ],
})
export class AppModule {}
