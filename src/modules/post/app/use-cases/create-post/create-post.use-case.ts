import { Injectable } from '@nestjs/common';
import { PostTypeOrmRepository } from 'src/modules/post/adapters/persistance/post.typeorm.repository';
import { Post } from '../../domain/post';
import { UserTypeOrmRepository } from 'src/modules/user/adapters/persistance/user.typeorm.respository';
import { AuthorNotFoundException } from '../../shared/exceptions/author-not-found.exception';
import { CreatePostInput } from './inputs/create-post.input';

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostTypeOrmRepository,
    private readonly userRepository: UserTypeOrmRepository,
  ) {}

  async execute(postData: CreatePostInput) {
    const postToCreate = Post.create(postData);

    const author = await this.userRepository.findById(postData.authorId);

    if (!author) {
      throw new AuthorNotFoundException(postData.authorId);
    }

    postToCreate.setAuthor(author);

    const newPost = await this.postRepository.create(postToCreate);
    return newPost;
  }
}
