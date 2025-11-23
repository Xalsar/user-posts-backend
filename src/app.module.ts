import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { UserTypeOrmEntity } from './modules/user/adapters/persistance/user.typeorm.entity';
import { PostTypeOrmEntity } from './modules/post/adapters/persistance/post.typeorm.entity';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import z from 'zod';

const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().transform(Number), // We'll cast this to number
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [UserTypeOrmEntity, PostTypeOrmEntity],
      synchronize: true,
    }),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
