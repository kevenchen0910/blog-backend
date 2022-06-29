import { Config } from './config.interfaces';

const isDevelopment = process.env.NODE_ENV === 'development';

export const configFactory = async () => {
  if (isDevelopment) {
    /**
     * read env variables from .env file
     *
     * NOTE: should not use .env file at production env
     */
    (await import('dotenv')).config();
  }

  const {
    BCRYPT_SALT,
    BCRYPT_ROUND = 8,
  } = process.env;
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
    security: {
      bcryptSaltOrRounds: BCRYPT_SALT || Number(BCRYPT_ROUND),
    },
  });

  return config;
};
