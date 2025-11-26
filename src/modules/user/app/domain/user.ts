import { Post } from 'src/modules/post/app/domain/post';
import { createId } from '../../../../shared/utils/create-id';

export class User {
  id: string;
  name: string;
  email: string;
  posts: Post[];

  private constructor(user: Partial<User>) {
    this.id = user.id ?? createId('user')();
    this.name = user.name ?? '';
    this.email = user.email ?? '';

    if (user.posts) {
      this.posts = user.posts;
    }
  }

  static create(userData: Partial<User>): User {
    return new User(userData);
  }

  updateName(name: string) {
    this.name = name;
  }

  updateEmail(email: string) {
    this.email = email;
  }
}
