import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
