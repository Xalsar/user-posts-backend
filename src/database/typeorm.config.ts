import 'dotenv/config';

import { DataSource } from 'typeorm';

import { envSchema } from 'src/shared/zod-schemas/env-schema';

const parsedEnv = envSchema.parse({
  APP_NAME: process.env.APP_NAME,
  APP_PORT: process.env.APP_PORT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: parsedEnv.DATABASE_HOST,
  port: parsedEnv.DATABASE_PORT,
  username: parsedEnv.DATABASE_USERNAME,
  password: parsedEnv.DATABASE_PASSWORD,
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
