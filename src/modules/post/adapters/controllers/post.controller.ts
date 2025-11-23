import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ListAllPostsUseCase } from '../../app/use-cases/list-all-posts/list-all-posts.use-case';
import { CreatePostUseCase } from '../../app/use-cases/create-post/create-post.use-case';

import { CreatePostRequestDto } from './dtos/request/create-post.request.dto';
import { DeletePostUseCase } from '../../app/use-cases/delete-post/delete-post.use-case';
import { UpdatePostUseCase } from '../../app/use-cases/update-post/update-post.use-case';
import { UpdatePostRequestDto } from './dtos/request/update-post.request.dto';
import { TransferPostAuthorshipUseCase } from '../../app/use-cases/transfer-post-authorship/transfer-post-authorship.use-case';
import { GetPostResponseDto } from './dtos/response/get-posts.response.dto';
import { UpdatePostResponseDto } from './dtos/response/update-post.response.dto';
import { CreatePostResponseDto } from './dtos/response/create-post.response.dto';
import { TransferOwnershipResponseDto } from './dtos/response/transfer-ownership.response.dto';
import { AuthorNotFoundException } from '../../app/shared/exceptions/author-not-found.exception';
import { PostNotFoundException } from '../../app/use-cases/shared/exceptions/post-not-found.exception';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly listAllPostsUseCase: ListAllPostsUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly transferPostAuthorshipUseCase: TransferPostAuthorshipUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    type: [GetPostResponseDto],
    description: 'List of posts retrieved successfully',
  })
  @Get()
  async getPosts(): Promise<GetPostResponseDto[]> {
    const posts = await this.listAllPostsUseCase.execute();
    return posts.map(GetPostResponseDto.create);
  }

  @ApiOperation({ summary: 'Create a new post' })
  @ApiOkResponse({
    type: CreatePostResponseDto,
    description: 'Post created successfully',
  })
  @ApiNotFoundResponse({
    type: AuthorNotFoundException,
    description: 'Author not found',
  })
  @Post()
  async createPost(
    @Body() postData: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const createdPost = await this.createPostUseCase.execute(postData);
    return CreatePostResponseDto.create(createdPost);
  }

  @ApiOperation({ summary: 'Update a post' })
  @ApiOkResponse({
    type: UpdatePostResponseDto,
    description: 'Post updated successfully',
  })
  @ApiNotFoundResponse({
    type: PostNotFoundException,
    description: 'Post not found',
  })
  @Patch(':id')
  async updatePost(
    @Param('id') postId: string,
    @Body() updateData: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    const updatedPost = await this.updatePostUseCase.execute(
      postId,
      updateData,
    );
    return UpdatePostResponseDto.create(updatedPost);
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiOkResponse({
    description: 'Post deleted successfully',
  })
  @Delete(':id')
  deletePost(@Param('id') postId: string): Promise<void> {
    return this.deletePostUseCase.execute(postId);
  }

  @ApiOperation({
    summary: 'Transfer the authorship of a post to a new author',
  })
  @ApiOkResponse({
    type: TransferOwnershipResponseDto,
    description: 'Post authorship transferred successfully',
  })
  @ApiNotFoundResponse({
    type: PostNotFoundException,
    description: 'Post not found',
  })
  @ApiNotFoundResponse({
    type: AuthorNotFoundException,
    description: 'New author not found',
  })
  @Post(':postId/transfer-authorship/:newAuthorId')
  async transferPostAuthorship(
    @Param('postId') postId: string,
    @Param('newAuthorId') newAuthorId: string,
  ): Promise<TransferOwnershipResponseDto> {
    const updatedPost = await this.transferPostAuthorshipUseCase.execute(
      postId,
      newAuthorId,
    );
    return TransferOwnershipResponseDto.create(updatedPost);
  }
}
