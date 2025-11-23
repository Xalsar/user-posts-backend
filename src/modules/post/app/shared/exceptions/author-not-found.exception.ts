import { NotFoundException } from '@nestjs/common';

export class AuthorNotFoundException extends NotFoundException {
  constructor(authorId: string) {
    super(`Author with id ${authorId} not found.`);
  }
}
