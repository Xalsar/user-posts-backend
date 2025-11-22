import { Injectable } from '@nestjs/common';

import { PostTypeOrmRepository } from 'src/modules/post/adapters/persistance/post.typeorm.repository';

@Injectable()
export class DeletePostUseCase {
  constructor(private readonly postRepository: PostTypeOrmRepository) {}

  async execute(postId: string): Promise<void> {
    await this.postRepository.delete(postId);
  }
}
