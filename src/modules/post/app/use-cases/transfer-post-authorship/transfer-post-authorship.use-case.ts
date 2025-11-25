import { Injectable } from '@nestjs/common';
import { PostTypeOrmRepository } from 'src/modules/post/adapters/persistance/post.typeorm.repository';
import { PostNotFoundException } from '../shared/exceptions/post-not-found.exception';
import { AuthorNotFoundException } from '../../shared/exceptions/author-not-found.exception';
import { UserRepositoryPort } from 'src/modules/user/app/ports/user-repository.port';

@Injectable()
export class TransferPostAuthorshipUseCase {
  constructor(
    private readonly postRepository: PostTypeOrmRepository,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(postId: string, newAuthorId: string) {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new PostNotFoundException(postId);
    }

    const newAuthor = await this.userRepository.findById(newAuthorId);

    if (!newAuthor) {
      throw new AuthorNotFoundException(newAuthorId);
    }

    post.changeAuthor(newAuthor);

    await this.postRepository.update(post);

    return post;
  }
}
