// eslint-disable-next-line import/no-extraneous-dependencies
import { CookieOptions } from 'express';

export interface GraphQLConfig {
  autoSchemaFile?: string | boolean;
  debug?: boolean;
  playground?: boolean;
  sortSchema?: boolean;
  useGlobalPrefix?: boolean;
}

export interface SecurityConfig {
  secret?: string | Buffer;
  expiresIn?: string;
  refreshIn?: string;
  bcryptSaltOrRounds: string | number;
}

export interface CookiesConfig extends CookieOptions {
  secret?: string;
}

export interface Config {
  graphql: GraphQLConfig;
  security: SecurityConfig;
  cookies: CookiesConfig;
}
