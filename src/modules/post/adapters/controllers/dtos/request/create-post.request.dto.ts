import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostRequestDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  content: string;

  @IsNotEmpty({ message: 'Author ID should not be empty' })
  authorId: string;
}
