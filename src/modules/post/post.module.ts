import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTypeOrmEntity } from './adapters/persistance/post.typeorm.entity';
import { PostController } from './adapters/controllers/post.controller';
import { ListAllPostsUseCase } from './app/use-cases/list-all-posts/list-all-posts.use-case';
import { PostTypeOrmRepository } from './adapters/persistance/post.typeorm.repository';
import { CreatePostUseCase } from './app/use-cases/create-post/create-post.use-case';
import { UserModule } from '../user/user.module';
import { UpdatePostUseCase } from './app/use-cases/update-post/update-post.use-case';
import { DeletePostUseCase } from './app/use-cases/delete-post/delete-post.use-case';

const useCases = [
  ListAllPostsUseCase,
  CreatePostUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([PostTypeOrmEntity]), UserModule],
  controllers: [PostController],
  providers: [...useCases, PostTypeOrmRepository],
})
export class PostModule {}
