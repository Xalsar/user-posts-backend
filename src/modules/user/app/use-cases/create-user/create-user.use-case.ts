import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserWithThatEmailAlradyExistsException } from './exceptions/user-with-that-email-alrady-exists.exception';
import { CreateUserInput } from './inputs/create-user.input';
import { UserRepositoryPort } from '../../ports/user-repository.port';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(userData: CreateUserInput) {
    const userToCreate = User.create(userData);

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UserWithThatEmailAlradyExistsException(userData.email);
    }

    const newUser = await this.userRepository.create(userToCreate);
    return newUser;
  }
}
