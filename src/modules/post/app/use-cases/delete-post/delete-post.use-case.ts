import { Injectable } from '@nestjs/common';

import { PostRepositoryPort } from '../../ports/post-repository.port';

@Injectable()
export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  async execute(postId: string): Promise<void> {
    await this.postRepository.delete(postId);
  }
}
