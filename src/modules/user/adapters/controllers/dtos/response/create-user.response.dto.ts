import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/modules/user/app/domain/user';

export class CreateUserResponseDto {
  @ApiProperty({ example: 'usr_12345' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  static create(user: User): CreateUserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
