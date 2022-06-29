export interface GraphQLConfig {
  autoSchemaFile?: string | boolean;
  debug?: boolean;
  playground?: boolean;
  sortSchema?: boolean;
  useGlobalPrefix?: boolean;
}

export interface Config {
  graphql: GraphQLConfig;
}
