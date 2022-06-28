export interface GraphQLConfig {
  autoSchemaFile?: string;
  debug?: boolean;
  playground?: boolean;
  sortSchema?: boolean;
  useGlobalPrefix?: boolean;
}

export interface Config {
  graphql: GraphQLConfig;
}
