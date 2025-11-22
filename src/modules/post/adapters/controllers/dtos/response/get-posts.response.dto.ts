import { ApiProperty } from '@nestjs/swagger';

import { Post } from 'src/modules/post/app/domain/post';
import { User } from 'src/modules/user/app/domain/user';

export class GetPostResponseDto {
  @ApiProperty({ example: 'post_12345' })
  id: string;

  @ApiProperty({ example: 'My First Post' })
  title: string;

  @ApiProperty({ example: 'This is the content of my first post.' })
  content: string;

  @ApiProperty({ example: 'usr_67890' })
  authorId: string;

  @ApiProperty({
    type: User,
    example: {
      id: 'usr_67890',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })
  author: User;

  static create(post: Post): GetPostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      author: post.author,
    };
  }
}
