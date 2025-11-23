import { ConfigModule as NestJsConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import z from 'zod';

const envSchema = z.object({
  APP_NAME: z.string().optional(),
  PORT: z.string().transform(Number).optional(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});

@Module({
  imports: [
    NestJsConfigModule.forRoot({
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          throw new Error(
            `❌ Invalid environment variables: ${JSON.stringify(parsed.error.issues)}`,
          );
        }

        return parsed.data;
      },
    }),
  ],
})
export class ConfigModule {}
