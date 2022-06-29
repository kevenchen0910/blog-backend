import { Config } from './config.interfaces';

const isDevelopment = process.env.NODE_ENV === 'development';

export const configFactory = async () => {
  const config: Config = ({
    graphql: {
      /**
       * use in-memory schema file by default
       *
       * NOTE: could not write file in azure function runtime
       * */
      autoSchemaFile: true,
      debug: false,
      playground: isDevelopment,
      sortSchema: true,
      useGlobalPrefix: true,
    },
  });

  return config;
};
