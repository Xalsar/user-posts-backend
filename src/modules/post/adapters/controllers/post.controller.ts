import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllPostsUseCase } from '../../app/use-cases/list-all-posts/list-all-posts.use-case';
import { CreatePostUseCase } from '../../app/use-cases/create-post/create-post.use-case';

import { CreatePostDto } from './dtos/create-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly listAllPostsUseCase: ListAllPostsUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all posts' })
  @Get()
  getPosts() {
    return this.listAllPostsUseCase.execute();
  }

  @ApiOperation({ summary: 'Create a new post' })
  @Post()
  createPost(@Body() postData: CreatePostDto) {
    return this.createPostUseCase.execute(postData);
  }
}
