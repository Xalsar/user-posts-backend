import { ConfigModule as NestJsConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { envSchema } from '../../shared/zod-schemas/env-schema';

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
