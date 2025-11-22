import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAllPostsUseCase } from '../../app/use-cases/list-all-posts/list-all-posts.use-case';
import { CreatePostUseCase } from '../../app/use-cases/create-post/create-post.use-case';

import { CreatePostDto } from './dtos/create-post.dto';
import { DeletePostUseCase } from '../../app/use-cases/delete-post/delete-post.use-case';
import { UpdatePostUseCase } from '../../app/use-cases/update-post/update-post.use-case';
import { UpdatePostDto } from './dtos/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly listAllPostsUseCase: ListAllPostsUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
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

  @ApiOperation({ summary: 'Update a post' })
  @Put(':id')
  updatePost(@Param('id') postId: string, @Body() updateData: UpdatePostDto) {
    return this.updatePostUseCase.execute(postId, updateData);
  }

  @ApiOperation({ summary: 'Delete a post' })
  @Delete(':id')
  deletePost(@Param('id') postId: string) {
    return this.deletePostUseCase.execute(postId);
  }
}
