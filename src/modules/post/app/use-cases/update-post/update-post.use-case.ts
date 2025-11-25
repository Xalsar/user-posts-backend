import { Injectable } from '@nestjs/common';
import { PostNotFoundException } from '../shared/exceptions/post-not-found.exception';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostRepositoryPort } from '../../ports/post-repository.port';

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  async execute(id: string, updateData: UpdatePostInput) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new PostNotFoundException(id);
    }

    post.updateTitle(updateData.title ?? post.title);
    post.updateContent(updateData.content ?? post.content);

    await this.postRepository.update(post);

    return post;
  }
}
