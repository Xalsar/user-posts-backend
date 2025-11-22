import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTypeOrmEntity } from './adapters/persistance/post.typeorm.entity';
import { PostController } from './adapters/controllers/post.controller';
import { ListAllPostsUseCase } from './app/use-cases/list-all-posts/list-all-posts.use-case';
import { PostTypeOrmRepository } from './adapters/persistance/post.typeorm.repository';
import { CreatePostUseCase } from './app/use-cases/create-post/create-post.use-case';
import { UserModule } from '../user/user.module';

const useCases = [ListAllPostsUseCase, CreatePostUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([PostTypeOrmEntity]), UserModule],
  controllers: [PostController],
  providers: [...useCases, PostTypeOrmRepository],
})
export class PostModule {}
