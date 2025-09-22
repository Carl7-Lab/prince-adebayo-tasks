export const EnvConfiguration = (): Record<string, unknown> => ({
  environment: process.env.NODE_ENV || 'dev',

  port: process.env.PORT || 3000,
  hostApi: process.env.HOST_API || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL,

  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,

  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 10,
});
