import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @IsOptional()
  title?: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  @IsOptional()
  content?: string;
}
