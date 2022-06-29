export interface GraphQLConfig {
  autoSchemaFile?: string | boolean;
  debug?: boolean;
  playground?: boolean;
  sortSchema?: boolean;
  useGlobalPrefix?: boolean;
}

export interface SecurityConfig {
  bcryptSaltOrRounds: string | number;
}

export interface Config {
  graphql: GraphQLConfig;
  security: SecurityConfig;
}
