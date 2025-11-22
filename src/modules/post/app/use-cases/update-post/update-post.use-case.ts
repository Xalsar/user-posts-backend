import { Injectable } from '@nestjs/common';
import { PostTypeOrmRepository } from 'src/modules/post/adapters/persistance/post.typeorm.repository';
import { PostNotFoundException } from './exceptions/post-not-found.exception';

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostTypeOrmRepository) {}

  async execute(id: string, updateData: { title?: string; content?: string }) {
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
