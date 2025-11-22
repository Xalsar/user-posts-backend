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

    if (post.author) {
      this.authorId = post.author.id;
      this.author = post.author;
    }
  }

  static create(postData: Partial<Post>): Post {
    const post = new Post(postData);

    return post;
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
  }

  updateContent(newContent: string) {
    this.content = newContent;
  }

  changeAuthor(newAuthor: User) {
    this.authorId = newAuthor.id;
    this.author = newAuthor;
  }

  setAuthor(author: User) {
    this.author = author;
    this.authorId = author.id;
  }
}
