import z from 'zod';

export const envSchema = z.object({
  APP_NAME: z.string(),
  APP_PORT: z.string().transform(Number),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});
