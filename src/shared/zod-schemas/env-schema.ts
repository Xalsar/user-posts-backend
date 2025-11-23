import z from 'zod';

export const envSchema = z.object({
  APP_NAME: z.string().optional(),
  APP_PORT: z.string().transform(Number).optional(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});
