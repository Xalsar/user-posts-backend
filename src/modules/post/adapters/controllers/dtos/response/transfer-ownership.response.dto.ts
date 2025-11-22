import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/modules/post/app/domain/post';
import { User } from 'src/modules/user/app/domain/user';

export class TransferOwnershipResponseDto {
  @ApiProperty({ example: 'post_12345' })
  id: string;

  @ApiProperty({ example: 'Updated Post Title' })
  title: string;

  @ApiProperty({ example: 'This is the updated content of the post.' })
  content: string;

  @ApiProperty({ example: 'usr_67890' })
  authorId: string;

  @ApiProperty({
    example: {
      id: 'usr_67890',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  })
  author: User;

  static create(post: Post): TransferOwnershipResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      author: post.author,
    };
  }
}
