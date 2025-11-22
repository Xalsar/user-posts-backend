import { Injectable } from '@nestjs/common';

import { PostTypeOrmRepository } from 'src/modules/post/adapters/persistance/post.typeorm.repository';

@Injectable()
export class ListAllPostsUseCase {
  constructor(private readonly postRepository: PostTypeOrmRepository) {}

  async execute() {
    return this.postRepository.findAll();
  }
}
