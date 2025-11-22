import { PostTypeOrmEntity } from './post.typeorm.entity';
import { Injectable } from '@nestjs/common';
import { Post } from '../../app/domain/post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PostTypeOrmRepository {
  constructor(
    @InjectRepository(PostTypeOrmEntity)
    private readonly postRepository: Repository<PostTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find();

    return posts.map((post) => PostTypeOrmEntity.toDomain(post));
  }

  async create(postToCreate: Post): Promise<Post> {
    const postEntity = this.postRepository.create(postToCreate);

    const savedPost = await this.postRepository.save(postEntity);

    return Post.create({
      id: savedPost.id,
      title: savedPost.title,
      content: savedPost.content,
      authorId: savedPost.author.id,
    });
  }

  async findById(id: string): Promise<Post | null> {
    const postEntity = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!postEntity) {
      return null;
    }

    return PostTypeOrmEntity.toDomain(postEntity);
  }

  async update(postToUpdate: Post): Promise<Post> {
    const postEntity = this.postRepository.create(postToUpdate);
    const savedPost = await this.postRepository.save(postEntity);
    return PostTypeOrmEntity.toDomain(savedPost);
  }

  async delete(postId: string): Promise<void> {
    await this.postRepository.delete(postId);
  }
}
