import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/modules/user/app/domain/user';
import { Post } from 'src/modules/post/app/domain/post';

export class GetUsersResponseDto {
  @ApiProperty({ example: 'usr_12345' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({
    example: [
      {
        id: 'post_67890',
        title: 'My First Post',
        content: 'This is the content of my first post.',
      },
    ],
    description: 'List of posts created by the user',
    type: [Post],
  })
  posts: {
    id: string;
    title: string;
    content: string;
  }[];

  static create(user: User): GetUsersResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      posts: user.posts.map((post: Post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
      })),
    };
  }
}
