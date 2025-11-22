import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { UserTypeOrmEntity } from './modules/user/adapters/persistance/user.typeorm.entity';
import { PostTypeOrmEntity } from './modules/post/adapters/persistance/post.typeorm.entity';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      // database: 'test',
      entities: [UserTypeOrmEntity, PostTypeOrmEntity],
      synchronize: true,
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
