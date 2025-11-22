import { User } from 'src/modules/user/app/domain/user';
import { createId } from 'src/shared/utils/create-id';

export class Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;

  private constructor(post: Partial<Post>) {
    this.id = post.id ?? createId('post')();
    this.title = post.title ?? '';
    this.content = post.content ?? '';
    this.authorId = post.authorId ?? '';
  }

  static create(postData: Partial<Post>): Post {
    const post = new Post(postData);

    return post;
  }

  setAuthor(author: User) {
    this.author = author;
    this.authorId = author.id;
  }
}
