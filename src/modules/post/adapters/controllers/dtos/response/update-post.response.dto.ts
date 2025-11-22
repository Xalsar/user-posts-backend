import { ApiProperty } from '@nestjs/swagger';

import { Post } from 'src/modules/post/app/domain/post';

export class UpdatePostResponseDto {
  @ApiProperty({ example: 'post_12345' })
  id: string;

  @ApiProperty({ example: 'Updated Post Title' })
  title: string;

  @ApiProperty({ example: 'This is the updated content of the post.' })
  content: string;

  static create(post: Post): UpdatePostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  }
}
