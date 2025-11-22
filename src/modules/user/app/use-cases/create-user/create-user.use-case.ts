import { Injectable } from '@nestjs/common';
import { UserTypeOrmRepository } from 'src/modules/user/adapters/persistance/user.typeorm.respository';
import { User } from 'src/modules/user/app/domain/user';
import { UserWithThatEmailAlradyExistsException } from './exceptions/user-with-that-email-alrady-exists.exception';
import { CreateUserPort } from './ports/create-user.ports';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async execute(userData: CreateUserPort) {
    const userToCreate = User.create(userData);

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UserWithThatEmailAlradyExistsException(userData.email);
    }

    const newUser = await this.userRepository.create(userToCreate);
    return newUser;
  }
}
