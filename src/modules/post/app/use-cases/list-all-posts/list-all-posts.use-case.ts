import { Injectable } from '@nestjs/common';

import { PostRepositoryPort } from '../../ports/post-repository.port';

@Injectable()
export class ListAllPostsUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}
  async execute() {
    return this.postRepository.findAll();
  }
}
