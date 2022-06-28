import { Config } from './config.interfaces';

const isProduction = process.env.NODE_ENV === 'production';

export const configFactory = async () => {
  const config: Config = ({
    graphql: {
      autoSchemaFile: './src/schema.gql',
      debug: false,
      playground: !isProduction,
      sortSchema: true,
      useGlobalPrefix: true,
    },
  });

  return config;
};
