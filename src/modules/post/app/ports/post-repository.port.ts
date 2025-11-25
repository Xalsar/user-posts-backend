import { Post } from '../domain/post';

export abstract class PostRepositoryPort {
  abstract findAll(): Promise<Post[]>;
  abstract findById(id: string): Promise<Post | null>;
  abstract create(postToCreate: Post): Promise<Post>;
  abstract update(postToUpdate: Post): Promise<Post>;
  abstract delete(id: string): Promise<void>;
}
